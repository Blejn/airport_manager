import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, share, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { UserCookie } from '../models/UserCookie';
import { UserLog } from '../models/UserLog';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private apiUrl = '/users';
  public isUserLoggedIn = false;
  user!: User;
  user_request = this.http
    .get<UserCookie>(environment.API_URL + this.apiUrl + '/user', {
      withCredentials: true,
    })
    .pipe(
      share()
      // share zastępuje multicast(()=> new Subject<UserCookie> refCount( ON LICZY SUBSKRYBENTÓW)
      // ROBI UNICAST NA MULTICAST
      //Jakbym dał shareReplay() to będzie cały czas pobierał te same dane
    );
  userData = new Subject<UserCookie>();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {
    // this.user_request.subscribe((user) => {
    //   this.userData.next(user);
    // });
  }
  ngOnInit() {}

  login(data: UserLog): Observable<UserLog> {
    return this.http.post<UserLog>(
      environment.API_URL + this.apiUrl + '/login',
      data,
      { withCredentials: true }
    );
  }
  register(data: User): Observable<User> {
    return this.http.post<User>(
      environment.API_URL + this.apiUrl + '/register',
      data,
      { withCredentials: true }
    );
  }
  getUser(): Observable<UserCookie> {
    return this.user_request;
  }
  logoutUser(): Observable<UserCookie> {
    return this.http.post<UserCookie>(
      environment.API_URL + this.apiUrl + '/logout',
      { withCredentials: true }
    );
  }
}
