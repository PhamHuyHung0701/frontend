import {CommonModule} from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_URL } from '../../../app.config';
import { Book } from '../../../Models/book';
import { TokenService } from '../../../Services/tokenService';
import { EndPageComponent } from '../../Share/end-page/end-page.component';
import { MenuComponent } from '../../Share/menu/menu.component';
import { CreateBookComponent } from '../create-book/create-book.component';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { BookService } from '../../../Services/bookService';


@Component({
  selector: 'app-book-manage',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, MatDialogModule, CommonModule, MenuComponent, EndPageComponent],
  templateUrl: './book-manage.component.html',
  styleUrl: './book-manage.component.scss'
})
export class BookManageComponent {

  code: number = 0;
  message: string = '';
  data: Book[] = [];
  apiUrl: string = '';
  books: Book[] = [];
  shoppingCard: Book[] = [];

  deleteMessage: string = '';
  tokenService: TokenService = new TokenService();
  currentPage = 1;
  itemsPerPage = 10;
  paginatedBooks: Book[] = [];

  constructor(private http: HttpClient,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getBooks();
  }

  idToken: string = '';
  bookService: BookService = new BookService(this.http);

  getBooks() {
    this.bookService.getBooks().subscribe(
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


  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId).subscribe(
      (response: any) => {
        this.deleteMessage = response.message;
        this.code = response.code;
        if (this.code === 1) {
          this.message = response.message;
          setTimeout(() => {
            this.deleteMessage = '';
          }, 3000);
          this.getBooks();
        } else {
          this.deleteMessage = response.message;
          setTimeout(() => {
            this.deleteMessage = '';
          }, 3000);
        }
      },
      error => {
        console.log("Error: " + error.message);
      }
    );
  }

  editBook(book: Book) {
    localStorage.setItem('bookUpdate', JSON.stringify(book));
    const dialogRef = this.dialog.open(UpdateBookComponent, {
      width: '40%',
      height: '70%',
      data: {book}
    });
  }

  addNewBook() {
    const dialogRef = this.dialog.open(CreateBookComponent, {
      width: '40%',
      height: '70%'
    });
  }

  searchText: string = '';

  searchBook() {
    localStorage.setItem('searchText', JSON.stringify(this.searchText));
    this.bookService.searchBook().subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        this.data = response.object;
        if (this.code === 1) {
          this.books = response.object;
          this.updatePaginatedBooks();
        } else {
          // this.router.navigate(['/searcherror']);
          this.books = [];
          this.updatePaginatedBooks();
        }
      },
      error => {
        console.log('Error: ' + error.message);
      }
    );
  }
}
