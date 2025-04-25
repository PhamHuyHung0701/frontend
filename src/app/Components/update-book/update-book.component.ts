import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


export interface Book {
  id: number;
  name: string;
  price: number;
  quantity: number;
  author: string;
  imageUrl: string;
  description: string;
  category: string;
  selected: false;
}

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.scss'
})
export class UpdateBookComponent {

  book: Book | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { book: Book },
    private http: HttpClient,
    private router: Router) {
    this.book = data.book;
  }
  
  onSubmit() {
    throw new Error('Method not implemented.');
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



}
