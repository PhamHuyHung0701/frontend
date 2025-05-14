import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Component} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MenuComponent} from '../menu/menu.component';
import {Router} from '@angular/router';
import {API_URL} from '../../app.config';
import {Book} from '../../Models/book';
import { EndPageComponent } from "../end-page/end-page.component";

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

  idToken: string = '';

  constructor(private http: HttpClient, private router: Router) {
  }

  book: Book | null = null;

  ngOnInit() {
    const bookData = localStorage.getItem('book');
    if (bookData) {
      this.book = JSON.parse(bookData);
    }
  }

  onAddShoppingCart() {
    this.apiUrl = API_URL + 'shopcart';
    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      this.idToken = JSON.parse(tokenData);
    } else {
      this.idToken = '';
    }

    const loginData = {
      productId: this.book?.id,
    };
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');
    this.http.post(this.apiUrl, loginData, {headers}).subscribe(
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
