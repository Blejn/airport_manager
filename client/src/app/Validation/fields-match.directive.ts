import { Directive, Injectable } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[passwordValidate]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: FieldsMatchDirective, multi: true },
  ],
})
@Injectable({
  providedIn: 'root',
})
export class FieldsMatchDirective implements Validator {
  constructor() {
    console.log(this);
  }

  validate(control: AbstractControl<string, any>): ValidationErrors | null {
    const hasValidPassword = control.value.match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    );
    if (hasValidPassword) {
      return null;
    }
    return { badPassword: true };
  }
  registerOnValidatorChange?(fn: () => void) {
    fn();
  }
}
