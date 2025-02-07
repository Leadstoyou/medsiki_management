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
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent extends BaseComponent implements OnInit {
  @ViewChild('dataTable') table: TableComponent;
  tableData: { data: ITableItem[]; pageIndex: number; pageSize: number; totalItem: number } = {
    data: [],
    pageIndex: 1,
    pageSize: PAGE_SIZE[0],
    totalItem: 0,
  };
  tableConfig: ITableConfig[] = TABLE_CONFIG.TABLE_ADMIN_PRODUCT;
  isLoading = true;
  dialogRef: NzModalRef;
  url = environment.socketUrl;
  getTypeDescription = getTypeDescription;

  constructor(
    protected componentService: ComponentService,
    private formBuilder: FormBuilder,
    private userRepository: UserRepository,
    private cdr: ChangeDetectorRef,
    private firebaseService: FirebaseService,
    private courseService: CourseService,
    private productService: ProductService,
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
    this.subscribeOnce(this.firebaseService.getTableData('products', params.page || 1, params.size || 25), {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (data: any) => {
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
  openCreateModal() {
    this.dialogRef = this.dialogService.open(CreateProductComponent, {
      footer: null,
      title: 'Create Product',
      closable: true,
      width: 800,
      data: {},
      closeOutSizeOrESC: false,
    });
    this.dialogRef.afterClose.subscribe(() => {
      this.getCourses();
    });
  }
  openEditModal(data: any) {
    this.dialogRef = this.dialogService.open(EditProductComponent, {
      footer: null,
      title: 'Edit Product',
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
