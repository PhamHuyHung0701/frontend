import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EndPageComponent } from '../../Share/end-page/end-page.component';
import { MenuComponent } from '../../Share/menu/menu.component';
import { Router } from '@angular/router';
import { PayService } from '../../../Services/payService';
import { Bill } from '../../../Models/bill'; // Assuming Bill is an interface or type

@Component({
  selector: 'app-bill-detail',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, MenuComponent, EndPageComponent],
  templateUrl: './bill-detail.component.html',
  styleUrl: './bill-detail.component.scss'
})
export class BillDetailComponent {
  constructor(private http: HttpClient, private router: Router) {
  }
  code: number = 0;
  message: string = '';
  payService: PayService = new PayService(this.http);
  billId: number = 0;
  bill: Bill = {} as Bill;
  ngOnInit() {
    const billId = localStorage.getItem('bill');
    if (billId) {
      this.billId = JSON.parse(billId);
    }
    this.payService.getBillDetail(this.billId).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        if (this.code === 1) {
          this.bill = response.object;
        } else {
          alert(response.message);
        }
      },
      error => {
        alert("Lỗi hệ thống");
        console.error(error);
      }

    )
  }
}
