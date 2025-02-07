import { DATE_RANGE, DateRangeKey } from '#utils/const';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements OnInit {
  @Output() dateRangeChanged: EventEmitter<Date[]> = new EventEmitter<Date[]>();
  @Output() rangeNameChanged: EventEmitter<string> = new EventEmitter<string>();
  @Input() initialDate: Date[] = DATE_RANGE.TODAY;
  @Input() nzFormat: 'dd-MM-yyyy HH:mm:ss' | 'dd-MM-yyyy' | 'dd/MM/yyyy HH:mm:ss' | 'dd/MM/yyyy' = 'dd-MM-yyyy';

  ranges: Record<DateRangeKey, Date[]> = {
    Today: DATE_RANGE.TODAY,
    Yesterday: DATE_RANGE.YESTERDAY,
    'Last 7 days': DATE_RANGE.LAST_7_DAYS,
    'Last 14 days': DATE_RANGE.LAST_14_DAYS,
    'Last 30 days': DATE_RANGE.LAST_30_DAYS,
    'This week': DATE_RANGE.THIS_WEEK,
    'Last week': DATE_RANGE.LAST_WEEK,
    'This month': DATE_RANGE.THIS_MONTH,
    'Last month': DATE_RANGE.LAST_MONTH,
    'This year': DATE_RANGE.THIS_YEAR,
    'Last year': DATE_RANGE.LAST_YEAR,
    'Last 90 days': DATE_RANGE.LAST_90_DAYS,
    'Last 180 days': DATE_RANGE.LAST_180_DAYS,
  };

  date = DATE_RANGE.TODAY;
  ngOnInit(): void {
    this.date = this.initialDate;
    // this.dateRangeChanged.emit(this.date);
    // this.rangeNameChanged.emit('Today');
  }

  onChange(result: Date[]): void {
    this.dateRangeChanged.emit(result);
    const rangeName = (Object.keys(this.ranges) as DateRangeKey[]).find(
      (key) =>
        this.ranges[key][0].getTime() === result[0].getTime() && this.ranges[key][1].getTime() === result[1].getTime(),
    );
    this.rangeNameChanged.emit(rangeName ?? '');
  }
}
