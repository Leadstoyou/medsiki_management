import { promiseHelper } from '#utils/promise.helper';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'image-fragment',
  templateUrl: './image-fragment.component.html',
  styleUrl: './image-fragment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFragmentComponent implements OnInit {
  @Input() isLoading: boolean;
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
