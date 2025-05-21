import {CommonModule} from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from '../../../app.config';
import { Book } from '../../../Models/book';
import { TokenService } from '../../../Services/tokenService';
import { EndPageComponent } from '../../Share/end-page/end-page.component';
import { MenuComponent } from '../../Share/menu/menu.component';
import { PayService } from '../../../Services/payService';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, MenuComponent, EndPageComponent],
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
  tokenService: TokenService = new TokenService();
  payService: PayService = new PayService(this.http);

  constructor(private http: HttpClient, private router: Router) {
  }

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
    this.payService.submitPayment(this.selectedBooks, this.totalPrice, this.address, this.phone).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        this.data = response.object;
        if (this.code === 1) {
          alert(response.message);
          this.router.navigate(['/home']);
        } else {
          alert(response.message);
        }
      },
      error => {
        alert("Lỗi hệ thống");
        console.log("Error: " + error.message);
      }
    )
  }
}
