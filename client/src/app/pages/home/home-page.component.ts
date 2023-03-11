import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/User';
import { UserCookie } from 'src/app/models/UserCookie';
import { Sort } from '@angular/material/sort';
import { UserSharedService } from '../flights/user-shared.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  user!: UserCookie;
  sortedData!: UserCookie;
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private sharedService: UserSharedService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.setUser();
  }

  setUser() {
    return this.authService.getUser().subscribe((data) => {
      // this.sharedService.user$.next(data);
    });
  }
  getUser(): void {
    this.authService.getUser().subscribe((data) => {
      this.user = data;
    });
  }

  navigateToLoginPage() {
    this.router.navigate(['/login']);
  }
  navigateToFlyPage() {
    this.router.navigate(['/flights']);
  }
}
