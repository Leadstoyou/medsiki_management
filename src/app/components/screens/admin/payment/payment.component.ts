/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentService } from '#services/component.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '#components/core/base/base.component';
import { FirebaseService } from '#services/firebase.service';
import { PaymentService } from '#services/payment.service';
import { TableComponent } from '#components/core/table/table.component';
import { ITableConfig, ITableItem, SearchQuery } from '#interfaces/table.interface';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { PAGE_SIZE, USER_ROLE } from '#utils/const';
import { TABLE_CONFIG } from '#utils/table.config';
import { toSearchQuery } from '#utils/helpers';
import { BaseQueryRequest } from '#interfaces/api.interface';
import { debounceTime, merge } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent extends BaseComponent implements OnInit {
  @ViewChild('dataTable') table: TableComponent;
  tableData: { data: ITableItem[]; pageIndex: number; pageSize: number; totalItem: number } = {
    data: [],
    pageIndex: 1,
    pageSize: PAGE_SIZE[0],
    totalItem: 0,
  };
  tableConfig: ITableConfig[] = TABLE_CONFIG.TABLE_ADMIN_PAYMENTS;
  isLoading = true;
  dialogRef: NzModalRef;
  listPayment: any[] = [];
  statusList = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
  statusMarks = {
    0: 'Pending',
    1: 'Confirmed',
    2: 'Shipped',
    3: 'Delivered',
    4: 'Canceled',
  };

  constructor(
    private paymentService: PaymentService,
    protected componentService: ComponentService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private firebaseService: FirebaseService,
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
    this.getAllPayments(query);
  }
  getAllPayments(params: BaseQueryRequest = {}) {
    this.subscribeOnce(this.firebaseService.getTableData('carts', params.page || 1, params.size || 25), {
      onSuccess: (data: any) => {
        this.listPayment = data.records.map((payment: any) => ({
          ...payment,
          statusIndex: this.getStatusIndex(payment.status), 
        }));

        this.tableData = {
          data: this.listPayment, 
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
  getStatusIndex(status: string): number {
    const statusMap = {
      pending: 0,
      confirmed: 1,
      shipped: 2,
      delivered: 3,
      cancelled: 4,
    };
    return statusMap[status as keyof typeof statusMap] || 0;
  }

  // Update the payment status based on the new slider value
  updateStatus(payment: any, newStatusIndex: number) {
    const newStatus = this.statusList[newStatusIndex]; // Get the status string from the index
    this.paymentService.updatePaymentStatus(payment.id, newStatus); // Update the status
    this.onSearch();
  }

  initializeStatusIndex(data: any) {
    data.statusIndex = this.getStatusIndex(data.status); 
  }
}
