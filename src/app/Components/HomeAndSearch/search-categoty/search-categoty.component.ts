import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {API_URL} from '../../../app.config';
import {MenuComponent} from "../../Share/menu/menu.component";
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {Book} from '../../../Models/book';
import { EndPageComponent } from "../../Share/end-page/end-page.component";

@Component({
  selector: 'app-search-categoty',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, MenuComponent, EndPageComponent],
  templateUrl: './search-categoty.component.html',
  styleUrl: './search-categoty.component.scss'
})
export class SearchCategotyComponent {
  code: number = 0;
  message: string = '';
  data: Book[] = [];
  apiUrl: string = '';
  books: Book[] = [];
  searchText: string = '';

  currentPage = 1; // Trang hiện tại
  itemsPerPage = 8; // Số sách trên mỗi trang
  paginatedBooks: Book[] = []; // Danh sách sách hiển thị trên trang hiện tại

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.apiUrl = API_URL + 'product/category';
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');
    const searchData = localStorage.getItem('searchCategory')?.trim();
    if (searchData) {
      this.searchText = JSON.parse(searchData);
    }
    const params = new HttpParams().set('categoryName', this.searchText);

    this.http.get(this.apiUrl, {headers, params}).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        this.data = response.object;
        if (this.code === 1) {
          this.books = response.object;
          this.updatePaginatedBooks();
        } else {
          this.router.navigate(['/searcherror']);
        }
      },
      error => {
        console.log('Error: ' + error.message);
      }
    );
  }

  // Cập nhật danh sách sách hiển thị trên trang hiện tại
  updatePaginatedBooks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBooks = this.books.slice(startIndex, endIndex);
  }

  // Chuyển đến trang cụ thể
  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedBooks();
  }

  // Tính tổng số trang
  get totalPages(): number {
    return Math.ceil(this.books.length / this.itemsPerPage);
  }

  // Tạo danh sách các trang cần hiển thị
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
