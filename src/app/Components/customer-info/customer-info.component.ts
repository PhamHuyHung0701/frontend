import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';
import { API_URL } from '../../app.config';
import { User } from '../../Models/user';
import { Bill } from '../../Models/bill';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, MenuComponent],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.scss'
})
export class CustomerInfoComponent {

  code: number = 0;
  message: string = '';
  data: string = '';
  apiUrl: string = '';
  idToken: string = '';
  user: User | null = null;
  bills: Bill[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
     this.getCustomerInfo();
  }

  getCustomerInfo() {
    this.apiUrl = API_URL + 'user/info';
    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      this.idToken = JSON.parse(tokenData);
    }
    else {
      this.idToken = '';
    }

    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');

    this.http.get(this.apiUrl, { headers }).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        if (this.code === 1) {
            this.user = response.object.user;
            this.bills = response.object.bills;
        }
        else {
          alert(response.message);
        }
      },
      error => {
        console.log("Error: " + error.message);
      }
    )
  }

  editUser() {}

  changePassword() {}
}
