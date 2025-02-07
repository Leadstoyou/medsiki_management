import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[restrictDecimal]',
})
export class RestrictDecimalDirective implements OnChanges {
  @Input() decimalPlaces: number = 2;
  @Input() allowNegative: boolean = true;
  private lastValidValue: string | null = null;
  private regexRestrict: RegExp;

  constructor(private el: ElementRef<HTMLInputElement>) {
    this.updateRegex();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['decimalPlaces'] || changes['allowNegative']) {
      this.updateRegex();
    }
  }

  private updateRegex(): void {
    this.regexRestrict = new RegExp(`^${this.allowNegative ? '-?' : ''}[\\d,]*\\.?\\d{0,${this.decimalPlaces}}$`);
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = this.el.nativeElement;
    const value = inputElement.value;
    if (this.regexRestrict.test(value)) {
      this.lastValidValue = value;
    } else if (this.lastValidValue !== null) {
      inputElement.value = this.lastValidValue;
      event.preventDefault();
    }
  }
}
