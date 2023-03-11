import { AuthService } from './../../auth/auth.service';
import { TicketService } from './../../services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCookie } from 'src/app/models/UserCookie';
import { Ticket } from 'src/app/models/Ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  user!: UserCookie;
  ticketsArray!: Ticket[];
  ticket!: Ticket;
  displayedColumns: string[] = [
    'flightNumber',
    'departure_time',
    'departure_country',
    'departure_city',
    'destination_time',
    'destination_country',
    'destination_city',
    'weight',
    'action',
  ];

  constructor(
    private route: ActivatedRoute,
    private ticketsService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    this.authService.getUser().subscribe((data) => {
      this.user = data;
      console.log(data);
    });
  }
  loadTickets() {
    this.ticketsService.getTickets(this.user?._id).subscribe((data) => {
      this.ticketsArray = data;
      console.log(this.ticketsArray);
    });
  }
}
