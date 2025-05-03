import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { API_URL } from '../../app.config';
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
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  code: number = 0;
  message: string = '';
  data: Book[] = [];
  apiUrl: string = '';
  books: Book[] = [];
  shoppingCard: Book[] = [];

  currentImageIndex = 0; // Chỉ số ảnh hiện tại
  images = [
    'assets/banner1.jpg', 
    'assets/banner2.jpg',
    'assets/banner3.jpg' 
  ];

  constructor(private http: HttpClient, private router: Router) {}

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  currentPage = 1; // Trang hiện tại
  itemsPerPage = 12; // Số sách trên mỗi trang
  paginatedBooks: Book[] = [];

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.apiUrl = API_URL + 'product/home';
    const language = navigator.language;
    const headers = new HttpHeaders().set('Accept-Language', language).set('ngrok-skip-browser-warning', 'true');
    this.http.get(this.apiUrl, { headers }).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        this.data = response.object;
        if (this.code === 1) {
          this.books = response.object;
          this.updatePaginatedBooks();
        } else {
          console.log(response.message);
        }
      },
      error => {
        console.log("Error: " + error.message);
      }
    );
  }

  updatePaginatedBooks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBooks = this.books.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedBooks();
  }

  get totalPages(): number {
    return Math.ceil(this.books.length / this.itemsPerPage);
  }

  get pagesToShow(): number[] {
    const totalPages = this.totalPages;
    const pages: number[] = [];

    // Luôn hiển thị trang đầu tiên
    if (this.currentPage > 2) {
      pages.push(1);
    }

    // Hiển thị dấu "..." nếu cần
    if (this.currentPage > 3) {
      pages.push(-1); // -1 đại diện cho "..."
    }

    // Hiển thị trang liền trước
    if (this.currentPage > 1) {
      pages.push(this.currentPage - 1);
    }

    // Hiển thị trang hiện tại
    pages.push(this.currentPage);

    // Hiển thị trang liền sau
    if (this.currentPage < totalPages) {
      pages.push(this.currentPage + 1);
    }

    // Hiển thị dấu "..." nếu cần
    if (this.currentPage < totalPages - 2) {
      pages.push(-1); // -1 đại diện cho "..."
    }

    // Luôn hiển thị trang cuối cùng
    if (this.currentPage < totalPages - 1) {
      pages.push(totalPages);
    }

    return pages;
  }

  bookClick(book: Book) {
    localStorage.setItem('book', JSON.stringify(book));
    this.router.navigate(['/bookdetail']);
  }
}