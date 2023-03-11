import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCookie } from 'src/app/models/UserCookie';
import { environment } from 'src/environments/environment';
import { Ticket } from './../models/Ticket';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };
  constructor(private http: HttpClient) {}

  addTicket(ticketId: string, userId: string): Observable<Ticket> {
    return this.http.post<Ticket>(
      environment.API_URL + this.apiUrl + '/' + userId + '/ticket',
      ticketId,
      this.httpOptions
    );
  }
  putTicket(ticketNumber: string, userId: string): Observable<UserCookie> {
    return this.http.put<UserCookie>(
      environment.API_URL + this.apiUrl + '/' + userId + '/add',
      { ticketNumber: ticketNumber },
      this.httpOptions
    );
  }

  getAllUsers(): Observable<[username: string]> {
    return this.http.get<[username: string]>(
      environment.API_URL + this.apiUrl + '/all/users',
      this.httpOptions
    );
  }
}
