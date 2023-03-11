import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FillOut } from './directives/fillOut.directive';
import { HeaderComponent } from './header/header.component';
import { ModalCardComponent } from './modal-card/modal-card.component';
import { ModalComponent } from './modal/modal.component';
import { CreditCardPipe } from './pipes/credit-card.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    ModalComponent,
    ModalCardComponent,
    CreditCardPipe,
    FillOut,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  exports: [HeaderComponent, ModalComponent, ModalCardComponent, FillOut],
})
export class SharedModule {}
