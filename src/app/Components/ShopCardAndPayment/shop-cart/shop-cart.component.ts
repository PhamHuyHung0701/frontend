
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import {Component} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from '../../../app.config';
import { Book } from '../../../Models/book';
import { TokenService } from '../../../Services/tokenService';
import { EndPageComponent } from '../../Share/end-page/end-page.component';
import { MenuComponent } from '../../Share/menu/menu.component';
import { BookService } from '../../../Services/bookService';


@Component({
  selector: 'app-shop-cart',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, MenuComponent, EndPageComponent],
  templateUrl: './shop-cart.component.html',
  styleUrl: './shop-cart.component.scss'
})
export class ShopCartComponent {
  code: number = 0;
  message: string = '';
  idToken: string = '';
  data: Book[] = [];
  apiUrl: string = '';
  selectedBooks: Book[] = [];
  tokenService: TokenService = new TokenService();

  constructor(private http: HttpClient, private router: Router) {
  }
  bookService: BookService = new BookService(this.http);
  ngOnInit() {
    this.bookService.getBookInShopCart().subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        if (this.code === 1) {
          this.data = response.object;
        } else {
          console.log(response.message);
        }
      },
      error => {
        alert("Lỗi hệ thống");
        console.log("Error: " + error.message);
      }
    )
  }

  increaseQuantity(book: Book) {
    book.quantity++;
  }

  decreaseQuantity(book: Book) {
    if (book.quantity > 1) {
      book.quantity--;
    }
  }

  removeFromCart(book: Book) {
    this.bookService.removeFromCart(book).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        if (this.code === 1) {
          window.location.reload();
        } else {
          console.log(response.message);
        }
      },
      error => {
        alert("Lỗi hệ thống");
        console.log("Error: " + error.message);
      }
    )
  }

  updateSelectedBooks() {
    this.selectedBooks = this.data.filter((book) => book.selected);
  }

  calculateSelectedTotal(): number {
    return this.selectedBooks.reduce(
      (total, book) => total + book.price * book.quantity,
      0
    );
  }

  checkout() {
    localStorage.setItem('selectedBooks', JSON.stringify(this.selectedBooks));
    localStorage.setItem('totalPrice', JSON.stringify(this.calculateSelectedTotal()));
    this.router.navigate(['/payment']);
  }
}
