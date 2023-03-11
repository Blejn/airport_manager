import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserCookie } from 'src/app/models/UserCookie';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user!: UserCookie;
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  navigateToHomePage() {
    this.router.navigate(['/home']);
  }
  navigateToLoginPage() {
    this.router.navigate(['/login']);
  }
  navigateToFlyPage() {
    this.router.navigate(['/flights']);
  }
  getUser(): void {
    this.authService.getUser().subscribe((data) => {
      this.user = data;
    });
  }
  navigateToTicketsPage() {
    this.router.navigate(['/tickets']);
  }
  logout() {
    this.router.navigate(['/']);
  }
}
