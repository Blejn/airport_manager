import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsModule } from './pages/flights/flights.module';
import { LoginModule } from './pages/login/login-page.module';
import { TicketsModule } from './pages/tickets/tickets.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'login',
    loadChildren: () => LoginModule,
  },
  {
    path: 'flights',
    loadChildren: () => FlightsModule,
  },
  { path: 'tickets', loadChildren: () => TicketsModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
