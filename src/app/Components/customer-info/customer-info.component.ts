import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';
import { API_URL } from '../../app.config';

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

  constructor(private http: HttpClient, private router: Router) {}
  
  ngOnInit() {

  }

  getCustomerInfo()
  {
    this.apiUrl = API_URL + 'admin/product';
    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      this.idToken = JSON.parse(tokenData);
    }
    else {
      this.idToken = '';
    }
  }
}
