import { REGEX } from '#utils/const';
import { AbstractControl } from '@angular/forms';

export function FacebookLinkValidator(control: AbstractControl) {
  if (!control.value) return null;

  if (!(control.value || '').match(REGEX.facebook)) {
    return { facebook: true };
  }
  return null;
}
