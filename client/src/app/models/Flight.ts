export interface Flight {
  _id: string;
  flightNumber: string;
  passengers: Array<string>;
  departure_city: string;
  departure_time: Date;
  departure_country: string;
  destination_time: Date;
  destination_country: string;
  destination_city: string;
  price: number;
}
