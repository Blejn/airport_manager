import { UserService } from './../../../services/user.service';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Flight } from 'src/app/models/Flight';
import { User } from 'src/app/models/User';
import { UserCookie } from 'src/app/models/UserCookie';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css'],
})
export class FlightDetailsComponent implements OnInit {
  isPayment: boolean = false;
  isModal: boolean = false;
  isUserLogged!: boolean;
  flight!: Flight;
  user!: UserCookie;
  ticketForm!: FormGroup;
  breakpoint!: number;
  hours!: number;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private ticketService: TicketService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLoggedUser();
    this.loadFligt();
    this.breakpoint = window.innerWidth <= 1000 ? 1 : 2;
    this.timeFlight();
    this.isUserLoggedInApp();
    this.loadFormTicket();
  }

  loadFormTicket() {
    this.ticketForm = this.formBuilder.group({
      ticketNumber: Math.floor(Math.random() * 1000 + 1).toString(),
      flightNumber: Math.floor(Math.random() * 6 + 1).toString(),
      firstName: this.user?.firstname,
      lastName: this.user?.lastname,
      email: this.user?.email,
      destination_country: this.flight.destination_country,
      destination_city: this.flight.destination_city,
      destination_time: this.datePipe.transform(this.flight.destination_time),
      departure_city: this.flight.departure_city,
      departure_country: this.flight.departure_country,
      departure_time: this.datePipe.transform(this.flight.departure_time),
      pin: '',
      seat: 'seat' + Math.floor(Math.random() * 1000 + 1).toString(),
      userId: this.user._id,
      payment: this.isPayment,
    });
  }
  // date: 'short':'UTC'
  onResize(event: any) {
    this.breakpoint = window.innerWidth <= 1000 ? 1 : 2;
  }
  loadFligt() {
    this.flight = this.route.snapshot.data['flight'];
  }
  timeFlight() {
    var departure = new Date(this.flight.departure_time);
    var destination = new Date(this.flight.destination_time);
    this.hours = departure.getHours() - 1 - (destination.getHours() - 1);
    this.hours = Math.abs(this.hours);
  }
  isUserLoggedInApp() {
    if (!this.user) {
      this.isUserLogged === false;
    } else {
      this.isUserLogged === true;
    }
    return this.isUserLogged;
  }
  createTicket(): void {
    this.loadFormTicket();
    const ticketFormData = Object.assign({}, this.ticketForm.value);
    if (this.isPayment) {
      this.ticketService.addTicket(ticketFormData).subscribe(() => {
        console.log(ticketFormData);
      });

      this.userService
        .putTicket(ticketFormData.ticketNumber, this.user._id)
        .subscribe(() => {
          console.log(this.user);
        });

      this.router.navigate(['/']);
      alert('Success');
    } else {
      alert('Not detected payment');
    }
  }
  loadLoggedUser() {
    this.user = this.route.snapshot.data['user'];
  }
  closeModal(event: boolean) {
    this.isModal = event;
  }
  openModal() {
    this.isModal = true;
  }
  acceptPayment(event: boolean) {
    this.isPayment = event;
  }
}
