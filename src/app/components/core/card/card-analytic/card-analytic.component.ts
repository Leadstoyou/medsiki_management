import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'card-analytic',
  templateUrl: './card-analytic.component.html',
  styleUrl: './card-analytic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardAnalyticComponent {
  @Input() title?: string = '';
  @Input() prefix?: string | null = null;
  @Input() value?: string | number | null = null;
  @Input() suffix?: string | null = null;
  @Input() upTren?: string | number | null = null;
  @Input() downTren?: string | number | null = null;
  @Input() valueStyle: string = '';
  @Input() titleStyle: string = '';
  @Input() isUppercase = true;
  @Input() customContent: TemplateRef<unknown>;
  @Input() customTitle: TemplateRef<unknown>;
  @Input() ngClass: string = 'card-bg-primary';

  get isShowPrefixAndSuffix(): boolean {
    return this.value === 0 || !!this.value;
  }
}
