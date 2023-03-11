import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/models/Flight';
import { FlightsService } from 'src/app/services/flights.service';

@Injectable({
  providedIn: 'root',
})
export class FlightResolve implements Resolve<Flight> {
  constructor(private flightsService: FlightsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Flight> {
    return this.flightsService.getFlight(route.params['id']);
  }
}
