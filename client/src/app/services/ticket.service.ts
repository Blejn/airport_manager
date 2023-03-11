import { Ticket } from './../models/Ticket';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Flight } from '../models/Flight';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = '/tickets';

  constructor(private http: HttpClient) {}

  addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(
      environment.API_URL + this.apiUrl + '/createTicket',
      ticket,
      {
        withCredentials: true,
      }
    );
  }
  getTickets(userId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      environment.API_URL + this.apiUrl + '/' + userId + '/myTickets'
    );
  }
}
