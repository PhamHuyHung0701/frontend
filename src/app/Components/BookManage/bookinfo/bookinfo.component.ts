import {CommonModule} from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from '../../../app.config';
import { Book } from '../../../Models/book';
import { TokenService } from '../../../Services/tokenService';
import { EndPageComponent } from '../../Share/end-page/end-page.component';
import { MenuComponent } from '../../Share/menu/menu.component';
import { BookService } from '../../../Services/bookService';


@Component({
  selector: 'app-bookinfo',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, MenuComponent, EndPageComponent],
  templateUrl: './bookinfo.component.html',
  styleUrl: './bookinfo.component.scss'
})
export class BookinfoComponent {

  code: number = 0;
  message: string = '';
  data: string = '';

  apiUrl: string = '';
  tokenService: TokenService = new TokenService();
  idToken: string = '';

  constructor(private http: HttpClient, private router: Router) {
  }
  bookService: BookService = new BookService(this.http);
  book: Book | null = null;

  ngOnInit() {
    const bookData = localStorage.getItem('book');
    if (bookData) {
      this.book = JSON.parse(bookData);
    }
  }

  onAddShoppingCart() {
    this.bookService.onAddShoppingCart(this.book?.id ?? 0).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        this.data = response.object;
        if (this.code === 1) {
          this.message = response.message;
          setTimeout(() => {
            this.message = '';
          }, 3000);
        } else {
          this.message = response.message;
          setTimeout(() => {
            this.message = '';
          }, 3000);
        }
      },
      error => {
        console.log("Error: " + error.message);
      }
    )

  }
}
