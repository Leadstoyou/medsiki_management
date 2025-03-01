import { FirebaseService } from '#services/firebase.service';
import { BaseComponent } from '#components/core/base/base.component';
import { TableComponent } from '#components/core/table/table.component';
import { environment } from '#environments/environment';
import { BaseQueryRequest } from '#interfaces/api.interface';
import { ITableConfig, ITableItem, SearchQuery } from '#interfaces/table.interface';
import { UserRepository } from '#repositories/user.repository';
import { ComponentService } from '#services/component.service';
import { getTypeDescription, PAGE_SIZE, USER_ROLE } from '#utils/const';
import { toSearchQuery } from '#utils/helpers';
import { TABLE_CONFIG } from '#utils/table.config';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { debounceTime, merge } from 'rxjs';
import { CourseService } from '#services/course.service';
import { CourseManageComponent } from './course-manage/course-manage.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent extends BaseComponent implements OnInit {
  @ViewChild('dataTable') table: TableComponent;
  tableData: { data: ITableItem[]; pageIndex: number; pageSize: number; totalItem: number } = {
    data: [],
    pageIndex: 1,
    pageSize: PAGE_SIZE[0],
    totalItem: 0,
  };
  tableConfig: ITableConfig[] = TABLE_CONFIG.TABLE_ADMIN_COURSE;
  isLoading = true;
  dialogRef: NzModalRef;
  url = environment.socketUrl;
  activeUser: number;
  getTypeDescription = getTypeDescription;
  constructor(
    protected componentService: ComponentService,
    private formBuilder: FormBuilder,
    private userRepository: UserRepository,
    private cdr: ChangeDetectorRef,
    private firebaseService: FirebaseService,
    private courseService: CourseService,
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

  getCourses(params: BaseQueryRequest = {}) {
    this.subscribeOnce(this.firebaseService.getTableData('courses', params.page || 1, params.size || 25), {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (data: any) => {
        this.activeUser = (data.records as []).reduce((acc, record) => {
          if (record['isActive']) {
            // Kiểm tra nếu `isActive` là false
            return acc + 1;
          }
          return acc;
        }, 0);

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
  openCourseManageModal(data: any) {
    this.dialogRef = this.dialogService.open(CourseManageComponent, {
      footer: null,
      title: 'Upload Report',
      closable: true,
      width: 1000,
      data: {
        data: data,
      },
      closeOutSizeOrESC: false,
    });
    this.dialogRef.afterClose.subscribe(() => {
      this.getCourses();
    });
  }
  openCreateModal() {
    this.dialogRef = this.dialogService.open(CreateCourseComponent, {
      footer: null,
      title: 'Crreate Course',
      closable: true,
      width: 800,
      closeOutSizeOrESC: false,
    });
    this.dialogRef.afterClose.subscribe(() => {
      this.getCourses();
    });
  }
  openEditModal(data: any) {
    this.dialogRef = this.dialogService.open(EditCourseComponent, {
      footer: null,
      title: 'Edit Course',
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
