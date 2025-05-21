import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import {Component, Input} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_URL } from '../../../app.config';
import { TokenService } from '../../../Services/tokenService';
import { UserService } from '../../../Services/userServcice';


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  @Input() oldPassword: string = '';
  @Input() newPassword: string = '';
  @Input() confirmPassword: string = '';

  code: number = 0;
  message: string = '';
  data: string = '';
  idToken: string = '';
  apiUrl: string = '';
  tokenService: TokenService = new TokenService();

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,
              private http: HttpClient,
              private router: Router) {
  }
  userService: UserService = new UserService(this.http); 
  
  changePassword() {
    this.userService.changePassword(this.oldPassword,this.newPassword,this.confirmPassword).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        if (this.code === 1) {
          alert(this.message);
          this.dialogRef.close();
        } else {
          alert(this.message);
        }
      },
      error => {
        console.log("Error: " + error.message);
      }
    )
  }

  closeWindow() {
    this.dialogRef.close();
  }
}
