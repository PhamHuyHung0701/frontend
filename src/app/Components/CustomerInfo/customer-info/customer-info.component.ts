import {CommonModule} from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Bill } from '../../../Models/bill';
import { User } from '../../../Models/user';
import { TokenService } from '../../../Services/tokenService';
import { UserService } from '../../../Services/userServcice';
import { EndPageComponent } from '../../Share/end-page/end-page.component';
import { MenuComponent } from '../../Share/menu/menu.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';


@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, NgxPaginationModule, MenuComponent, EndPageComponent],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.scss'
})
export class CustomerInfoComponent {

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {
  }
  code: number = 0;
  message: string = '';
  data: string = '';
  apiUrl: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  idToken: string = '';
  user: User | null = null;
  bills: Bill[] = [];
  tokenService: TokenService = new TokenService();
  userService: UserService = new UserService(this.http); 
  response: any = {};
  ngOnInit() {
    this.getCustomerInfo();
  }

  getCustomerInfo() {
    this.userService.getCustomerInfo().subscribe(
      response => {
        this.message = response.message;
        this.code = response.code;
        if(this.code === 1) {
          this.user = response.object.user;
          this.bills = response.object.bills;
        }
        else{
          alert(this.message);
        }
      },
      error => {
        alert("Lỗi hệ thống");
        console.error(error);
      }
    );
  }

  editUser() {
    this.userService.editUser(this.user?.name || '', this.user?.address || '').subscribe(
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
        alert("Lỗi hệ thống");
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

  viewBill(bill: Bill) {
    localStorage.setItem('bill', JSON.stringify(bill.id));
    this.router.navigate(['/billdetail']);
  }
}
