import {CommonModule} from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_URL } from '../../../app.config';
import { Book } from '../../../Models/book';
import { TokenService } from '../../../Services/tokenService';
import { BookService } from '../../../Services/bookService';


export interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, MatDialogModule, CommonModule],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.scss'
})
export class UpdateBookComponent {

  code: number = 0;
  message: string = '';
  data: string = '';
  apiUrl: string = '';
  idToken: string = '';
  api_url: string = '';
  listCategory: Category[] = [];
  book: Book = {
    id: 1, // ID mặc định hoặc giá trị từ nguồn khác
    name: '',
    price: 0,
    quantity: 0,
    author: '',
    imageUrl: '',
    description: '',
    category: '',
    selected: false
  };
  upbook: Book = {
    id: 1, // ID mặc định hoặc giá trị từ nguồn khác
    name: '',
    price: 0,
    quantity: 0,
    author: '',
    imageUrl: '',
    description: '',
    category: '',
    selected: false
  };
  tokenService: TokenService = new TokenService();

  constructor(@Inject(MAT_DIALOG_DATA) public dataUpdate: { book: Book },
              public dialogRef: MatDialogRef<UpdateBookComponent>,
              private http: HttpClient,
              private router: Router) {
    this.upbook = dataUpdate.book;
  }

  bookService: BookService = new BookService(this.http);
  ngOnInit() {
    this.book = JSON.parse(JSON.stringify(this.upbook));
    this.getListCategory();
  }
  onSubmit() {
    if(this.book.quantity > 10000){
      alert("Số lượng không được lớn hơn 10000");
      return
    }
    this.bookService.updateBook(this.book).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        this.data = response.object;
        if (this.code === 1) {
          this.message = response.message;
          alert(this.message);
          this.dialogRef.close();
        } else {
          this.message = response.message;
          alert(this.message);
          this.dialogRef.close();
        }
      },
      error => {
        alert("Lỗi hệ thống");
        console.log("Error: " + error.message);
      }
    )
  }

  onFileSelected($event: Event): void {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result && this.book) {
          const arrayBuffer = reader.result as ArrayBuffer;
          const byteArray = new Uint8Array(arrayBuffer);

          const binaryString = Array.from(byteArray)
            .map(byte => String.fromCharCode(byte))
            .join('');
          const base64String = btoa(binaryString);
          this.book.imageUrl = base64String;
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  closeWindow() {
    this.dialogRef.close();
  }


  getListCategory() {
    this.bookService.getListCategory().subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        if (this.code === 1) {
          this.listCategory = response.object;
          this.book.category = this.listCategory[0].name;
        } else {
          console.log(response.message);
        }
      },
      error => {
        alert("Lỗi hệ thống");
        console.log("Error: " + error.message);
      }
    )
  }

  blockInvalidInput(event: KeyboardEvent): void {
    const key = event.key;
    if (!/^[0-9]$/.test(key) && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Delete') {
      event.preventDefault();
    }
  }
}
