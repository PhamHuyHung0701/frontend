import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';
import { API_URL } from '../../app.config';
import { Book } from '../../Models/book';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, MenuComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  @Input() address: string = '';
  @Input() phone: string = '';
  selectedBooks: Book[] = [];
  totalPrice: number = 0;
  code: number = 0;
  message: string = '';
  data: string = '';
  apiUrl: string = '';
  idToken: string = '';
  notificationMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const selectedBooksData = localStorage.getItem('selectedBooks')?.trim();
    if (selectedBooksData) {
      this.selectedBooks = JSON.parse(selectedBooksData);
    }
    const totalPrice = localStorage.getItem('totalPrice')?.trim();
    if (totalPrice) {
      this.totalPrice = JSON.parse(totalPrice);
    }
  }

  submitPayment() {

    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      this.idToken = JSON.parse(tokenData);
    }
    else {
      this.idToken = '';
    }

    this.apiUrl = API_URL + 'bill'
    const data = {
      products: this.selectedBooks,
      totalPrice: this.totalPrice,
      address: this.address,
      phoneNumber: this.phone
    };

    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Accept-Language', language)
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('ngrok-skip-browser-warning', 'true');
    this.http.post(this.apiUrl, data, { headers }).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        this.data = response.object;
        if (this.code === 1) {
          alert(response.message);
          this.router.navigate(['/home']);
        }
        else {
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
