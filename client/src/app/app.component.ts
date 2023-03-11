import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { User } from './models/User';
import { UserCookie } from './models/UserCookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentRoute!: any;

  constructor(
    private authService: AuthService,
    private activatedRouter: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getActualRouter();
  }
  getActualRouter() {
    this.activatedRouter.url.subscribe((data) => {
      this.currentRoute = data;
      console.log(this.currentRoute);
    });
  }
}
