import { Component, Input } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, MenuComponent],
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

      changePassword(){
        const changePassworData = {
              oldPassword : this.oldPassword,
              newPassword : this.newPassword,
              confirmPassword : this.confirmPassword
        };

        
      }


}
