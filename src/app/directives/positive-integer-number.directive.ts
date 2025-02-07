import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[positiveIntegerNumber]',
})
export class PositiveIntegerNumberDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    value = value.replace(/[^0-9]/g, '').replace(/^0+/, '');
    if (value === '') value = '1';
    this.ngControl.control?.setValue(parseInt(value));
  }
}
