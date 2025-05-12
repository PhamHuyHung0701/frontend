import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { API_URL } from '../../app.config';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { Book } from '../../Models/book';

@Component({
  selector: 'app-shop-cart',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, MenuComponent],
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

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      this.idToken = JSON.parse(tokenData);
    }
    else {
      this.idToken = '';
    }
    const language = navigator.language;
    this.apiUrl = API_URL + 'shopcart';
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.idToken}`).set('Accept-Language', language);
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');
    this.http.get(this.apiUrl, { headers }).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        if (this.code === 1) {
          this.data = response.object;
        }
        else {
          console.log(response.message);
        }
      },
      error => {
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
    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      this.idToken = JSON.parse(tokenData);
    }
    else {
      this.idToken = '';
    }
    const language = navigator.language;
    this.apiUrl = API_URL + `shopcart/${book.id}`;
    // const params = new HttpParams().set('productId', book.id);
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.idToken}`).set('Accept-Language', language);
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');
    this.http.delete(this.apiUrl, { headers }).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        if (this.code === 1) {
          window.location.reload();
        }
        else {
          console.log(response.message);
        }
      },
      error => {
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
