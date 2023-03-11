import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FieldsMatchDirective } from 'src/app/Validation/fields-match.directive';
import { LoginRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';

@NgModule({
  declarations: [LoginPageComponent, FieldsMatchDirective],
  exports: [LoginPageComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class LoginModule {}
