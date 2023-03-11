import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlightsRoutingModule } from './flights-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { FlightResolve } from './flight-resolve.service';
import { SharedModule } from '../../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { MatInputModule } from '@angular/material/input';
import { UserSharedService } from './user-shared.service';
import { UserResolver } from './user-resolve.service';
import { FlightsListComponent } from './flights-list/flights-list.component';
import { FlightsComponent } from './flights.component';

@NgModule({
  providers: [
    FlightResolve,
    UserSharedService,
    DatePipe,
    UserResolver,
    SharedModule,
  ],
  declarations: [
    FlightsComponent,
    FlightDetailsComponent,
    FlightsListComponent,
  ],
  exports: [FlightsListComponent],
  imports: [
    FlightsRoutingModule,
    SharedModule,
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    SharedModule,
    MatGridListModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class FlightsModule {}
