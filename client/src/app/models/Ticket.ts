export interface Ticket {
  _id: string;
  ticketNumber: string;
  flightNumber: string;
  departure_city: string;
  departure_time: Date;
  departure_country: string;
  destination_time: Date;
  destination_country: string;
  destination_city: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  userId: string;
  payment: boolean;
  seat: string;
}
