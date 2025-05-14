import {Component} from '@angular/core';
import {MenuComponent} from '../menu/menu.component';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {User} from '../../Models/user';
import {Router} from '@angular/router';
import {API_URL} from '../../app.config';
import {NgxPaginationModule} from 'ngx-pagination';
import { EndPageComponent } from "../end-page/end-page.component";

@Component({
  selector: 'app-account-manage',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, MatDialogModule, CommonModule, MenuComponent, NgxPaginationModule, EndPageComponent],
  templateUrl: './account-manage.component.html',
  styleUrl: './account-manage.component.scss'
})
export class AccountManageComponent {
  listUser: User[] = [];
  code: number = 0;
  message: string = '';
  data: User[] = [];
  idToken: string = '';
  apiUrl: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  paginatedUsers: User[] = [];

  constructor(private http: HttpClient,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      this.idToken = JSON.parse(tokenData);
    } else {
      this.idToken = '';
    }

    this.apiUrl = API_URL + 'admin/user';
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Accept-Language', language)
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('ngrok-skip-browser-warning', 'true');
    this.http.get(this.apiUrl, {headers}).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        this.data = response.object;
        if (this.code === 1) {
          this.listUser = response.object;
        } else {
          console.log(response.message);
        }
      },
      error => {
        console.log("Error: " + error.message);
      }
    );
  }

  resetPassword(user: User) {
    this.apiUrl = API_URL + `admin/user/reset-password/${user.id}`

    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      this.idToken = JSON.parse(tokenData);
    } else {
      this.idToken = '';
    }
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Accept-Language', language)
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('ngrok-skip-browser-warning', 'true');

    this.http.put(this.apiUrl,null, {headers}).subscribe(
      (response: any) => {
        this.code = response.code;
        if (this.code === 1) {
          alert(response.message);
          window.location.reload();
        } else {
          alert(response.message);
        }
      },
      error => {
        console.log("Error: " + error.message);
      }
    );
  }

  revokeAdmin(user: User) {
    this.apiUrl = API_URL + `admin/user/remove-role-admin/${user.id}`

    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      this.idToken = JSON.parse(tokenData);
    } else {
      this.idToken = '';
    }
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Accept-Language', language)
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('ngrok-skip-browser-warning', 'true');

    this.http.put(this.apiUrl,null, {headers}).subscribe(
      (response: any) => {
        this.code = response.code;
        if (this.code === 1) {
          alert(response.message);
          window.location.reload();
        } else {
          alert(response.message);
        }
      },
      error => {
        console.log("Error: " + error.message);
      }
    );
  }

  grantAdmin(user: User) {
    this.apiUrl = API_URL + `admin/user/add-role-admin/${user.id}`

    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      this.idToken = JSON.parse(tokenData);
    } else {
      this.idToken = '';
    }
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Accept-Language', language)
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('ngrok-skip-browser-warning', 'true');

    this.http.put(this.apiUrl,null, {headers}).subscribe(
      (response: any) => {
        this.code = response.code;
        if (this.code === 1) {
          alert(response.message);
          window.location.reload();
        } else {
          alert(response.message);
        }
      },
      error => {
        console.log("Error: " + error.message);
      }
    );
  }


  deleteAccount(user: User) {
    this.apiUrl = API_URL + `admin/user/reset-password/${user.id}`

    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      this.idToken = JSON.parse(tokenData);
    } else {
      this.idToken = '';
    }
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Accept-Language', language)
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('ngrok-skip-browser-warning', 'true');

    this.http.delete(this.apiUrl, {headers}).subscribe(
      (response: any) => {
        this.code = response.code;
        if (this.code === 1) {
          alert(response.message);
          window.location.reload();
        } else {
          alert(response.message);
        }
      },
      error => {
        console.log("Error: " + error.message);
      }
    );
  }

}
