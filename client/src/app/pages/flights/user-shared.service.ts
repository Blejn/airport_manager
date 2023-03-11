import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/app/models/User';
@Injectable({
  providedIn: 'root',
})
export class UserSharedService {
  isLoggedIn!: boolean;
  constructor() {}
  isLogin$ = new BehaviorSubject<boolean>(false);
  setUserState(status: boolean) {
    this.isLogin$.next(status);
  }
  getUserStatus() {
    return this.isLogin$;
  }
}
