import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from '../../app.config';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @Input() name: string = '';
  @Input() email: string = '';
  @Input() address: string = '';
  @Input() password: string = '';
  @Input() rePassword: string = '';
  apiUrl: string = API_URL + 'register'; // URL to web api
  message: any;
  code: any;
  data: any;


  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    const loginData = {
      name: this.name,
      address: this.address,
      email: this.email,
      password: this.password,
      rePassword: this.rePassword

    };
    console.log(this.email);
    const language = navigator.language;
    const headers = new HttpHeaders().set('Accept-Language', language);
    this.http.post(this.apiUrl, loginData, { headers }).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        this.data = response.object;
        if (this.code === 1) {
          alert(response.message);
          this.router.navigate(['/login']);
        }
        else {
          alert(response.message);
        }
      },
      (error: any) => {
        alert(error?.error?.message);
      }
    )
  }
}
