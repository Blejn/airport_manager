import { TicketsComponent } from './tickets.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TicketsRoutingModule } from './tickets-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [TicketsComponent],
  exports: [TicketsComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    TicketsRoutingModule,
    FormsModule,
    HttpClientModule,

    SharedModule,
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,

    MatGridListModule,
    MatInputModule,
  ],
})
export class TicketsModule {}
