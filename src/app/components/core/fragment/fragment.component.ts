import { promiseHelper } from '#utils/promise.helper';
import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-fragment',
  templateUrl: './fragment.component.html',
  styleUrls: ['./fragment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FragmentComponent implements OnInit {
  @Input() isLoading: boolean;
  @Input() header: TemplateRef<unknown>;
  @Input() template: TemplateRef<unknown>;
  @Input() showBorderLine: boolean;
  @Input() width = 'auto';
  @Input() timeDelay: number = 600;

  constructor(protected cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.showItem();
  }

  private async showItem() {
    if (!this.isLoading) {
      this.isLoading = true;
      await promiseHelper.delay(this.timeDelay);
      this.isLoading = false;
      this.cdr.markForCheck();
    }
  }
}
