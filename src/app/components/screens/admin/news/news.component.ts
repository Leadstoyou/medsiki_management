import { NewsService } from './../../../../services/news.service';
import { BaseComponent } from '#components/core/base/base.component';
import { TableComponent } from '#components/core/table/table.component';
import { environment } from '#environments/environment';
import { BaseQueryRequest } from '#interfaces/api.interface';
import { ITableConfig, ITableItem, SearchQuery } from '#interfaces/table.interface';
import { UserRepository } from '#repositories/user.repository';
import { ComponentService } from '#services/component.service';
import { CourseService } from '#services/course.service';
import { FirebaseService } from '#services/firebase.service';
import { getTypeDescription, PAGE_SIZE, USER_ROLE } from '#utils/const';
import { toSearchQuery } from '#utils/helpers';
import { TABLE_CONFIG } from '#utils/table.config';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { debounceTime, merge } from 'rxjs';
import { CourseManageComponent } from '../course/course-manage/course-manage.component';
import { ProductService } from '#services/product.service';
import { News } from '#services/news.service';
import { CreateNewsComponent } from './create-news/create-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent extends BaseComponent implements OnInit {
  @ViewChild('dataTable') table: TableComponent;
  tableData: { data: ITableItem[]; pageIndex: number; pageSize: number; totalItem: number } = {
    data: [],
    pageIndex: 1,
    pageSize: PAGE_SIZE[0],
    totalItem: 0,
  };
  tableConfig: ITableConfig[] = TABLE_CONFIG.TABLE_ADMIN_NEWS;
  isLoading = true;
  dialogRef: NzModalRef;
  url = environment.socketUrl;
  getTypeDescription = getTypeDescription;
  constructor(
    protected componentService: ComponentService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private firebaseService: FirebaseService,
    private newsService: NewsService,
  ) {
    super(componentService);
    this.formGroup = this.formBuilder.group({
      search: ['', []],
      from: ['', [Validators.min(0)]],
      to: ['', [Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.subscribeUntilDestroy(
      merge(
        this.getControl('search')!.valueChanges,
        this.getControl('from')!.valueChanges,
        this.getControl('to')!.valueChanges,
      ).pipe(debounceTime(1000)),
      () => {
        this.onSearch();
      },
    );
  }

  onBlur(controlName: string) {
    const control = this.getControl(controlName);
    if (control?.invalid) {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    }
  }

  async onSearch(data: Partial<SearchQuery> = { pageIndex: 1 }) {
    const { pageIndex, pageSize, sort } = { ...this.tableData, ...this.table.queries, ...data };
    const query = toSearchQuery(
      { pageIndex, pageSize, sort },
      {
        text: this.formGroup.value.search,
        role: USER_ROLE.ADMIN,
      },
    );
    this.getCourses(query);
  }
  openCreateModal() {
    this.dialogRef = this.dialogService.open(CreateNewsComponent, {
      footer: null,
      title: 'Create News',
      closable: true,
      width: 800,
      closeOutSizeOrESC: false,
    });
    this.dialogRef.afterClose.subscribe(() => {
      this.getCourses();
    });
  }
  getCourses(params: BaseQueryRequest = {}) {
    this.subscribeOnce(this.firebaseService.getTableData('news', params.page || 1, params.size || 25), {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (data: any) => {
        console.log('🚀 ~ NewsComponent ~ this.subscribeOnce ~ data:', data);
        this.tableData = {
          data: data.records || [],
          pageIndex: data.currentPage,
          pageSize: data.pageSize,
          totalItem: data.totalItems,
        };
        this.cdr.detectChanges();
      },
      onComplete: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  deleteNewModal(id: string) {
    this.dialogService.confirmWithoutIcon('confirm.title', 'confirm.delete', {
      onOk: () => {
        this.subscribeOnce(this.newsService.deleteNews(id), {
          onSuccess: () => {
            this.componentService.toast.success('toast.deleteSuccessMessage');
          },
          onComplete: () => {
            this.onSearch();
          },
        });
      },
    });
  }
  openCourseManageModal(data: any) {
    this.dialogRef = this.dialogService.open(EditNewsComponent, {
      footer: null,
      title: 'Edit News',
      closable: true,
      width: 800,
      data: {
        data: data,
      },
      closeOutSizeOrESC: false,
    });
    this.dialogRef.afterClose.subscribe(() => {
      this.getCourses();
    });
  }
}
