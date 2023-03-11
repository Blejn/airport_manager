import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';
import {
  matchPasswords,
  passwordVal,
  validateUsername,
} from 'src/app/Validation/MyValidation.directive';
import { UserSharedService } from '../flights/user-shared.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  loginMode: boolean = true;
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userSharedService: UserSharedService,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.buildForm();
    this.registerForm = this.buiildRegisterForm();
  }

  modeHandler() {
    this.loginMode = !this.loginMode;
  }

  back() {
    this.router.navigate(['/home']);
  }
  buildForm() {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.min(3)]],
      password: ['', Validators.required],
    });
  }
  buiildRegisterForm() {
    return this.formBuilder.group(
      {
        firstname: this.formBuilder.control('', [Validators.required]),
        lastname: this.formBuilder.control('', [Validators.required]),
        email: this.formBuilder.control('', [
          Validators.required,
          Validators.email,
        ]),
        username: this.formBuilder.control(
          '',
          [Validators.required, Validators.minLength(3)],
          validateUsername(this.userService)
        ),
        password: this.formBuilder.control('', [
          Validators.required,
          passwordVal({
            uppercase: true,
            lowercase: true,
            number: true,
            length: true,
          }),
          // Validators.pattern('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'),
        ]),
        repeatPassword: this.formBuilder.control('', [Validators.required]),
        city: this.formBuilder.control('', [Validators.required]),
        country: this.formBuilder.control('', [Validators.required]),
      },
      { validators: matchPasswords('password', 'repeatPassword') }
    );
  }
  success() {
    console.log('sukces');
  }
  navigateToRegister() {
    this.router.navigate(['/login/registration']);
  }
  submitLoginHandler(): void {
    let data = this.form.getRawValue();
    this.authService.login(data).subscribe((res) => {
      this.userSharedService.setUserState(true);
      this.router.navigate(['/']);
      window.localStorage.setItem('x-auth-token', data.username);
      window.location.reload();
    });
  }

  submitRegistrationHandler(): void {
    let data = this.registerForm.getRawValue();
    this.authService.register(data).subscribe((res) => {
      console.log('success');
      this.loginMode = !this.loginMode;
    });
  }
}
