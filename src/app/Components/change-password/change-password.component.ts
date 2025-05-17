import {Component, Input} from '@angular/core';
import {MenuComponent} from '../menu/menu.component';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {API_URL} from '../../app.config';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import { TokenService } from '../../Services/tokenService';

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

  changePassword() {
    this.apiUrl = API_URL + 'user/change-password';
    this.idToken = this.tokenService.getToken();
    const changePasswordData = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    };

    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');

    this.http.put(this.apiUrl, changePasswordData, {headers}).subscribe(
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
