export interface UserCookie {
  // $id: string;
  _id: string;
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  city: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  tickets: Array<string>;
}
