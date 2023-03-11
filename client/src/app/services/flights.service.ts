import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Flight } from '../models/Flight';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private apiUrl = '/flights';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}
  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(environment.API_URL + this.apiUrl + '/');
  }

  getFlight(id: string): Observable<Flight> {
    return this.http.get<Flight>(environment.API_URL + this.apiUrl + '/' + id);
  }
}
