import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
  selector: 'app-create-book',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.scss'
})
export class CreateBookComponent {
  [x: string]: any;

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  book: Book | null = null;
  constructor(private http: HttpClient, private router: Router) {
  }

  onFileSelected($event: Event): void {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.result && this.book) {
          // Lưu chuỗi Base64 trực tiếp từ FileReader
          this.book.imageUrl = reader.result as string;
        }
      };
  
      // Đọc file dưới dạng Data URL (Base64)
      reader.readAsDataURL(file);
    }
  }

  closeWindow() {
    window.close();
  }

}
