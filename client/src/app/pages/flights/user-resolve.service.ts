import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/User';

@Injectable()
export class UserResolver implements Resolve<User> {
  user!: User;
  constructor(private authService: AuthService) {}
  resolve(): User | Observable<User> | Promise<User> {
    if (this.authService.getUser() === null) {
      return this.user;
    }
    return this.authService.getUser();
  }
}
