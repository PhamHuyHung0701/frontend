import { Book } from "./book";
import { User } from "./user";

export interface Bill {
  id: number;
  date: string;
  totalPrice: number;
  address: string;
  description: string;
  phoneNumber: string;
  products: Book[];
  status: string;
  user: User;
}