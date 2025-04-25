import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_URL } from '../../app.config';


export interface Book {
  id: number;
  name: string;
  price: number;
  quantity: number;
  author: string;
  imageUrl: string;
  description: string;
  category: string;
  // selected: false;
}

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule,MatDialogModule, CommonModule],
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

  book: Book | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public dataUpdate: { book: Book },
    public dialogRef: MatDialogRef<UpdateBookComponent>,
    private http: HttpClient,
    private router: Router) {
    this.book = dataUpdate.book;
  }
  
  onSubmit() {
    this.apiUrl = API_URL + 'admin/product';
    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      this.idToken = JSON.parse(tokenData);
    }
    else {
      this.idToken = '';
    }

    const dataSubmit ={
      id : this.book?.id,
      name: this.book?.name,
      price: this.book?.price,
      quantity: this.book?.quantity,
      description: this.book?.description,
      category: this.book?.category,
      imageUrl: this.book?.imageUrl,
      author: this.book?.author,
    }

    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');
      
    this.http.put(this.apiUrl, dataSubmit, {headers}).subscribe(
            (response: any) => {
        this.message = response.message;
        this.code = response.code;
        this.data = response.object;
        if (this.code === 1) {
          this.message = response.message; 
          setTimeout(() => {
            this.message = '';
          }, 3000);
          this.dialogRef.close();
          // alert(this.message)
        }
        else {
          this.message = response.message;
          setTimeout(() => {
            this.message = '';
          }, 3000);
          this.dialogRef.close();
          // alert(this.message)
        }
      },
      error => {
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


}
