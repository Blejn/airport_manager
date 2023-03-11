import { TicketsComponent } from './tickets.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ticketsRoutes: Routes = [
  {
    path: '',
    component: <any>TicketsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ticketsRoutes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}
