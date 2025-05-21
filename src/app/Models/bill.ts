import { Book } from "./book";

export interface Bill {
  id: number;
  date: string;
  totalPrice: number;
  address: string;
  description: string;
  phoneNumber: string;
  products: Book[];
}