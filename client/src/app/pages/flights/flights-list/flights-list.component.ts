import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Flight } from 'src/app/models/Flight';
import { FlightsService } from 'src/app/services/flights.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/auth/auth.service';
import { UserSharedService } from '../user-shared.service';
@Component({
  selector: 'app-flights',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css'],
})
export class FlightsListComponent implements OnInit, AfterViewInit {
  @ViewChild('modalCard') modalCard!: ElementRef;
  isModal: boolean = false;
  cookie!: string;
  isUserLogged!: boolean;
  user!: User;
  flights!: Flight[];
  sortedData!: Flight[];
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
    private flightsService: FlightsService,
    private router: Router,
    private authService: AuthService,
    private userSharedService: UserSharedService
  ) {
    this.sortedData = this.flights;
  }

  ngOnInit(): void {
    this.getFlights();
    // this.isUser = this.user ? true : false;
    this.getStatus();
  }
  ngAfterViewInit(): void {}

  getFlights(): void {
    this.flightsService.getFlights().subscribe((data) => {
      this.flights = data;
      console.log(data);
    });
  }
  getStatus() {
    if (window.document.cookie) {
      return true;
    }
    return false;
  }
  getUser(): void {
    this.authService.getUser().subscribe((data) => {
      this.user = data;
    });
  }

  openModal() {
    this.isModal = true;
    alert('you are not logged');
  }
  closeModal(event: boolean) {
    this.isModal = event;
  }

  // announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }
  sortData(sort: Sort) {
    const data = this.flights.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'flightNumber':
          return this.compare(a.flightNumber, b.flightNumber, isAsc);

        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  goToFlightDetails(flight: Flight) {
    this.router.navigate(['flights/' + flight._id]);
  }
}
