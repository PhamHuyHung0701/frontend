import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from '../../app.config';
import { User } from '../../Models/user';

export interface Response {
  object: Data;
  code: number;
  message: string;
}

export interface Menu {
  id: number;
  name: string;
  children: Menu[];
}

export interface Data {
  idToken: string;
  roles: string[];
  user: User;
  menu: Menu[];
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  @Input() email: string = '';
  @Input() password: string = '';
  apiUrl: string = API_URL + 'login'; // URL to web api
  code: number = 0;
  message: string = '';
  data: Data[] = [];
  idToken: string = '';
  roles: string[] = [];
  user: User | null = null;
  menu: Menu[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };
    const language = navigator.language;
    const headers = new HttpHeaders().set('Accept-Language', language).set('ngrok-skip-browser-warning', 'true');
    this.http.post(this.apiUrl, loginData, { headers }).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        this.data = response.object;
        if (this.code === 1) {
          alert(response.message);
          this.idToken = response.object.idToken;
          this.user = response.object.user;
          this.menu = response.object.menuDTOS;
          this.roles = response.object.roles;
          localStorage.setItem('idToken', JSON.stringify(this.idToken));
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('menu', JSON.stringify(this.menu));
          localStorage.setItem('roles', JSON.stringify(this.roles));
          this.router.navigate(['/home']);
        }
        else {
          alert(response.message);
        }
      },
      error => {
        alert("Đăng nhập thất bại")
      }
    )
  }
}
