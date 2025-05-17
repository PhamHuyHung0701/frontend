import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Component} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MenuComponent} from '../menu/menu.component';
import {Router} from '@angular/router';
import {API_URL} from '../../app.config';
import {User} from '../../Models/user';
import {Bill} from '../../Models/bill';
import {MatDialog} from '@angular/material/dialog';
import {CreateBookComponent} from '../create-book/create-book.component';
import {ChangePasswordComponent} from '../change-password/change-password.component';
import { EndPageComponent } from "../end-page/end-page.component";
import { TokenService } from '../../Services/tokenService';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, MenuComponent, EndPageComponent],
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
  tokenService: TokenService = new TokenService();

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getCustomerInfo();
  }

  getCustomerInfo() {
    this.apiUrl = API_URL + 'user/info';
    this.idToken = this.tokenService.getToken();
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');

    this.http.get(this.apiUrl, {headers}).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        if (this.code === 1) {
          this.user = response.object.user;
          this.bills = response.object.bills;
        } else {
          alert(response.message);
        }
      },
      error => {
        console.log("Error: " + error.message);
      }
    )
  }

  editUser() {
    this.apiUrl = API_URL + 'user';
    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      this.idToken = JSON.parse(tokenData);
    } else {
      this.idToken = '';
    }
    const language = navigator.language;
    const changeUserData = {
      name: this.user?.name,
      address: this.user?.address,
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');

    this.http.put(this.apiUrl, changeUserData, {headers}).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        if (this.code === 1) {
          alert(this.message);
        } else {
          alert(this.message);
        }
      },
      error => {
        console.log("Error: " + error.message);
      }
    )
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '30%',
      height: '70%'
    });
  }
}
