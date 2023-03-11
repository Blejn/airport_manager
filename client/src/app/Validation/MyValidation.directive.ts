import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from './../services/user.service';

export function passwordVal(options: {
  uppercase?: boolean;
  lowercase?: boolean;
  number?: boolean;
  length?: boolean;
}): ValidatorFn {
  return (controlPassword: AbstractControl): ValidationErrors | null => {
    const hasNumber = controlPassword.value.match(/[\d]/);
    const hasLowerCase = controlPassword.value.match(/^[a-z]+$/);
    const hasUpperCase = controlPassword.value.match(/^[A-Z]+$/);
    const hasEightElementsLength = controlPassword.value.match(/[\W]/);
    const errors = { password: { ...options } };
    let valid = true;
    if (options.lowercase && !hasLowerCase) {
      errors.password['lowercase'] = true;
      valid = false;
    }
    if (options.uppercase && !hasUpperCase) {
      errors.password['uppercase'] = true;
      valid = false;
    }
    if (options.number && !hasNumber) {
      errors.password['number'] = true;
      valid = false;
    }
    if (options.length && !hasEightElementsLength) {
      errors.password['length'] = true;
      valid = false;
    }
    return valid ? null : errors.password;
  };
}

export function matchPasswords(password: string, confirm_password: string) {
  return (form: FormGroup) => {
    const passwordValue = form.controls[password];
    const confirmPassword = form.controls[confirm_password];

    if (passwordValue.value !== confirmPassword.value) {
      confirmPassword.setErrors({ matchPasswords: true });
    } else {
      confirmPassword.setErrors(null);
    }
  };
}

//-----------------ASYNC VALIDATORS
export function validateUsername(userService: UserService) {
  return (control: AbstractControl): Promise<any> | Observable<any> => {
    const value = control.value.toLowerCase();
    var notAllowed: string[] | any[] = [];

    const response = new Promise((resolve, reject) => {
      userService.getAllUsers().subscribe((username) => {
        notAllowed = [...username];
        setTimeout(() => {
          if (notAllowed.includes(value)) {
            resolve({ usernameExist: true });
          }
          resolve(null);
        }, 5000);
      });
    });
    return response;
  };
}
