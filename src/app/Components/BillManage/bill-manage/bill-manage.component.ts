import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EndPageComponent } from '../../Share/end-page/end-page.component';
import { MenuComponent } from '../../Share/menu/menu.component';
import { Bill } from '../../../Models/bill';
import { BillService } from '../../../Services/billService';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-bill-manage',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, MatDialogModule, CommonModule, MenuComponent, EndPageComponent,NgxPaginationModule],
  templateUrl: './bill-manage.component.html',
  styleUrl: './bill-manage.component.scss'
})
export class BillManageComponent {
  constructor(private http: HttpClient,
    private router: Router,
    private dialog: MatDialog) {
  }

  code: number = 0;
  message: string = '';
  data: Bill[] = [];
  apiUrl: string = '';
  email: string = '';
  startDate: string = '';
  endDate: string = '';
  billService: BillService = new BillService(this.http);
  currentPage = 1;
  itemsPerPage = 10;
  status: string = '';

  ngOnInit() {
    this.getAllBills();
  }
  getAllBills() {
     this.billService.getAllBills().subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        this.data = response.object;
        if (this.code === 1) {
          this.data = response.object;
        } else {
          alert(this.message);
          console.log(response.message);
        }
      },
      error => {
        alert("Lỗi hệ thống")
        console.log("Error: " + error.message);
      }
     );
  }

  searchBill() {
    this.billService.searchBill(this.email, this.startDate, this.endDate, this.status).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        if (this.code === 1) {
          this.data = response.object;
        } else {
          alert(this.message);
          console.log(response.message);
        }
      },
      error => {
        alert("Lỗi hệ thống");
        console.log("Error: " + error.message);
      }
    );
  }

  viewBillDetail(bill: Bill) {
    localStorage.setItem('bill', JSON.stringify(bill.id));
    this.router.navigate(['/billdetail']);
  }

  updateBillStatus(bill: Bill, status: string) {
    this.billService.updateBillStatus(bill.id, status).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        if (this.code === 1) {
          this.searchBill();
        } else {
          alert(this.message);
          console.log(response.message);
        }
      },
      error => {
        alert(error.message || "Lỗi hệ thống");
        console.log("Error: " + error.message);
      }
    );
  }
}
