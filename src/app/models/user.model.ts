export interface UserName {
  firstname: string;
  lastname: string;
}

export interface UserAddress {
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: UserName;
  address: UserAddress;
  phone: string;
}
