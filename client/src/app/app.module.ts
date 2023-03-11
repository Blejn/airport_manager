import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { ValidationFeedbackComponent } from './Validation/validation-feedback/validation-feedback.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ValidationFeedbackComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    ValidationFeedbackComponent
  ],
})
export class AppModule {}
