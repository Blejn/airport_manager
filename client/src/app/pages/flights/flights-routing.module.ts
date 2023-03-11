import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightResolve } from './flight-resolve.service';
import { FlightsListComponent } from './flights-list/flights-list.component';
import { FlightsComponent } from './flights.component';
import { UserResolver } from './user-resolve.service';

const flightsRoutes: Routes = [
  {
    path: '',
    component: <any>FlightsComponent,
    children: [
      { path: '', component: <any>FlightsListComponent },
      {
        path: ':id',
        component: <any>FlightDetailsComponent,
        resolve: { flight: FlightResolve, user: UserResolver },
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(flightsRoutes)],
  exports: [RouterModule],
})
export class FlightsRoutingModule {}
