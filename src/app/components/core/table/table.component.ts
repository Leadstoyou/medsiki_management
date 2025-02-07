import { ITableConfig, SearchQuery, ITableItem, ICheckedList, ICheckedData } from '#interfaces/table.interface';
import { CommonTable, PAGE_SIZE, SortTypeTable, USER_ROLE } from '#utils/const';
import { getAbsoluteHeight, checkRole } from '#utils/helpers';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Subject, debounceTime } from 'rxjs';

const DEFAULT_HEIGHT = '400px';
const MIN_HEIGHT = 300;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterViewInit {
  @Output() onClick = new EventEmitter<ITableItem>();
  @Output() onSearch = new EventEmitter<SearchQuery>();
  @Output() onCheckedChange = new EventEmitter<ICheckedList>();

  @Input() highlightCondition?: {
    key: string;
    value: unknown;
  };

  @Input() tableConfig: ITableConfig[];
  @Input() showCheckbox = false;
  @Input() pageSize = PAGE_SIZE[0];
  @Input() totalItem = 0;
  @Input() externalClass = '';
  @Input() parentClass = '';
  @Input() isShowIndex = false;
  @Input() isUpperCaseHeader = false;
  @Input() isShowHeader = true;
  @Input() isCursor = false;
  @Input()
  set height(value: string) {
    this._height = value ?? DEFAULT_HEIGHT;
    this.cdk.markForCheck();
  }

  @Input() widthStartScroll: string | 'auto' = '650px';
  @Input() isLoading: boolean | null;
  @Input() customCell: { [key: string]: TemplateRef<unknown> } = {};
  @Input() customCollumn: { [key: string]: TemplateRef<unknown> } = {};
  @Input() showPaginate = true;
  @Input() currentRole: USER_ROLE;
  @Input() stickyLastRow: boolean;

  protected _height = DEFAULT_HEIGHT;
  protected nzTotal: ITableItem[] = [];
  protected PAGE_SIZE = PAGE_SIZE;
  protected _pageIndex = 1;
  protected isCheckedAll = false;
  protected checkedMap: { [key: string]: ITableItem } = {};
  protected indeterminate = false;
  protected listOfSelection = [
    {
      text: CommonTable.textSelectAll,
      onSelect: () => {
        this.checkedData = {
          checkAll: true,
          checkedPage: {},
        };
        this.onAllChecked(true, true);
      },
    },
    {
      text: CommonTable.textSelectPage,
      onSelect: () => {
        this.onAllChecked(true, false);
      },
    },
  ];

  @Input() set pageIndex(index: number) {
    this._pageIndex = index ?? 1;
  }

  @Input() set data(value: ITableItem[]) {
    this.nzTotal = value.map((i) => ({ ...i, disabled: false }));
    this.cdk.markForCheck();
  }

  queries: SearchQuery;
  protected parentNode: HTMLElement | null;
  protected $height = new Subject();

  protected checkedData: ICheckedData = {
    checkAll: false,
    checkedPage: {},
  };
  private currentPageData: readonly ITableItem[] = [];

  constructor(
    protected cdk: ChangeDetectorRef,
    protected el: ElementRef,
  ) {
    this.$height.pipe(debounceTime(500)).subscribe(() => this.caculateHeight.call(this));
  }

  @HostListener('window:resize') protected onResize() {
    this.isCalculateHeight && this.$height.next(null);
  }

  ngOnInit(): void {
    if (this.isCalculateHeight) {
      this.parentNode = this.getParentNode(this.el.nativeElement);
    }
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.caculateHeight && this.caculateHeight.call(this));
  }

  resetCheckedAll() {
    this.isCheckedAll = false;
    this.checkedData = { checkAll: false, checkedPage: {} };
    this.checkedMap = {};
    this.indeterminate = false;
    this.cdk.detectChanges();
  }

  protected shouldHighlight(data: ITableItem): boolean {
    if (!this.highlightCondition) return false;
    const { key, value } = this.highlightCondition;
    return data[key] === value;
  }

  protected checkCanDisplay(roles?: USER_ROLE[]) {
    return checkRole(this.currentRole, roles);
  }

  protected isChecked(id: number): boolean {
    if (this.checkedData.checkedPage[this.queries?.pageIndex]) {
      this.isCheckedAll = true;
      return true;
    }
    return Boolean(this.checkedMap[id]);
  }

  protected onClickItem(rowData: ITableItem) {
    this.onClick.emit(rowData);
  }

  protected onQueryChange(data: NzTableQueryParams) {
    const sort = Object.values(data.sort).find((i) => Boolean(i.value));

    if (sort) {
      // eslint-disable-next-line
      // @ts-ignore
      sort.value = SortTypeTable[sort.value];
    }

    const query = {
      sort,
      pageIndex: 1,
      pageSize: this.pageSize,
    } as SearchQuery;

    this.queries = query;
    this.onSearch.emit(query);
    this.resetCheckedAll();
    this.scrollToTop();
  }

  protected onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.queries.pageSize = pageSize;
    this.onSearch.emit({ ...this.queries, pageIndex: 1 });
    this.resetCheckedAll();
    this.scrollToTop();
  }

  protected onPageIndexChange(pageIndex: number) {
    this.queries.pageIndex = pageIndex;
    this.onSearch.emit({ ...this.queries, pageSize: this.pageSize, pageIndex });
    this.scrollToTop();
  }

  protected scrollToTop() {
    const el = document.querySelector('.ant-table-body') as Element;
    if (el) {
      el.scrollTop = el.scrollHeight;
      el.scrollTop = 0;
    }
  }

  protected trackBy(id: number): number {
    return id;
  }

  protected generateId(index: number): number {
    return (this._pageIndex - 1) * this.pageSize + index + 1;
  }

  protected onItemChecked(item: ITableItem, checked: boolean): void {
    if (this.checkedData.checkAll) {
      this.checkedMap = this.mapToCheckedCurrentPageData();
      this.checkedData = { checkAll: false, checkedPage: {} };
    }
    this.updateCheckedSet(item, checked);
    this.refreshCheckedStatus();
  }

  protected onAllChecked(checked: boolean, isCheckedAllTable?: boolean): void {
    requestAnimationFrame(() => {
      if (this.checkedData.checkAll && !isCheckedAllTable) {
        this.checkedMap = this.mapToCheckedCurrentPageData();
        this.checkedData = { checkAll: false, checkedPage: {} };
      }
      this.nzTotal.filter(({ disabled }) => !disabled).forEach((item) => this.updateCheckedSet(item, checked));
      this.refreshCheckedStatus();
    });
  }

  protected get style(): string {
    return `--min-height: ${this._height}`;
  }

  protected sortOrder(config: ITableConfig) {
    return typeof config.sort === 'boolean' || config.sort === undefined ? null : config.sort;
  }

  protected refreshCheckedStatus(): void {
    const listOfEnabledData = this.currentPageData.filter(({ disabled }) => !disabled);
    this.isCheckedAll = !!listOfEnabledData.length && listOfEnabledData.every((item) => this.checkedMap[item._id]);
    if (this.checkedData.checkAll)
      this.checkedData.checkedPage[this._pageIndex] = listOfEnabledData.every((item) => this.checkedMap[item.id]);
    this.indeterminate = listOfEnabledData.some(({ id }) => Boolean(this.checkedMap[id])) && !this.isCheckedAll;

    this.onCheckedChange.emit({
      checkAll: this.checkedData.checkAll,
      checkedList: this.checkedList,
    });
    this.cdk.detectChanges();
  }

  protected updateCheckedSet(data: ITableItem, checked: boolean): void {
    if (checked) {
      this.checkedMap[data._id] = data;
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [data._id]: remove, ...rest } = this.checkedMap;
    this.checkedMap = { ...rest };
    this.cdk.markForCheck();
  }

  protected caculateHeight() {
    if (!this.parentNode) return;

    const breadcrumb = this.parentNode.querySelector('.breadcrumb') as HTMLElement;

    const breadcrumbHeight = getAbsoluteHeight(breadcrumb);

    let headerHeight = 0;
    const heightAvailable = getAbsoluteHeight(this.parentNode);
    this.parentNode.querySelectorAll(`.${this.externalClass}`).forEach((node) => {
      headerHeight += getAbsoluteHeight(node as HTMLElement);
    });

    const height = heightAvailable - headerHeight - breadcrumbHeight - 180;

    this.height = `${height < MIN_HEIGHT ? MIN_HEIGHT : height}px`;
    this.cdk.markForCheck();
  }

  protected getParentNode(el: HTMLElement): HTMLElement | null {
    if (!this.parentClass) return null;
    if (el.className.includes(this.parentClass)) {
      return el;
    }

    if (!el.parentElement) return null;
    return this.getParentNode(el.parentElement);
  }

  protected get isCalculateHeight(): boolean {
    return Boolean(this.parentClass && this.externalClass);
  }

  protected get checkedList(): ITableItem[] {
    return Object.values(this.checkedMap);
  }

  get pageEndIndex() {
    return Math.ceil(this.totalItem / this.pageSize);
  }

  protected onCurrentPageDataChange(item: readonly ITableItem[]) {
    this.currentPageData = item;
    this.checkedData.checkAll &&
      this.checkedData.checkedPage[this.queries.pageIndex] === undefined &&
      item.forEach((value) => this.updateCheckedSet(value, true));
    this.refreshCheckedStatus();
    this.cdk.markForCheck();
  }

  updateAllCheckedMap(data: ITableItem[], checked: boolean) {
    this.nzTotal.forEach((item) => this.updateCheckedSet(item, false));
    data.forEach((item) => this.updateCheckedSet(item, checked));
    this.refreshCheckedStatus();
  }

  private mapToCheckedCurrentPageData() {
    let checkedData: { [key: string]: ITableItem } = {};
    this.currentPageData.forEach((item) => {
      checkedData = {
        ...checkedData,
        [item.id]: item,
      };
    });
    return checkedData;
  }
}
