import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { API_URL } from '../../../app.config';
import { User } from '../../../Models/user';
import { TokenService } from '../../../Services/tokenService';
import { EndPageComponent } from '../../Share/end-page/end-page.component';
import { MenuComponent } from '../../Share/menu/menu.component';
import { UserService } from '../../../Services/userServcice';


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
  tokenService: TokenService = new TokenService();
  searchText: string = '';

  constructor(private http: HttpClient,
    private router: Router,
    private dialog: MatDialog) {
  }
  userService: UserService = new UserService(this.http);
  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAllUser().subscribe(
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
        alert("Lỗi hệ thống");
        console.log("Error: " + error.message);
      }
    );
  }

  resetPassword(user: User) {
    this.userService.resetPassword(user).subscribe(
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
        alert("Lỗi hệ thống");
        console.log("Error: " + error.message);
      }
    );
  }

  revokeAdmin(user: User) {
    this.userService.revokeAdmin(user).subscribe(
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
    this.userService.grantAdmin(user).subscribe(
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
        alert("Lỗi hệ thống");
        console.log("Error: " + error.message);
      }
    );
  }

  deleteAccount(user: User) {
    this.userService.deleteAccount(user).subscribe(
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

  searchAccount() {
    if (this.searchText === '') {
      this.getAllUser();
    } else {
      this.userService.searchAccountByEmail(this.searchText).subscribe(
        (response: any) => {
          this.code = response.code;
          if (this.code === 1) {
            this.listUser = response.object;
          } else {
            alert(response.message);
          }
        },
        error => {
          alert("Lỗi hệ thống");
          console.log("Error: " + error.message);
        }
      );
    }
  }
}
