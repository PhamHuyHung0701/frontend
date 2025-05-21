import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { API_URL } from "../app.config";
import { Observable } from "rxjs";
import { ResponseBackend } from "../Models/response";
import { TokenService } from "./tokenService";
import { Book } from "../Models/book";

export class BookService {
  constructor(private http: HttpClient) {
  }

  apiUrl: string | undefined;
  searchText: string = '';
  idToken: string | undefined;
  tokenService: TokenService = new TokenService();

  getBooks(): Observable<ResponseBackend> {
    this.apiUrl = API_URL + 'product/home';
    const language = navigator.language;
    const headers = new HttpHeaders().set('Accept-Language', language).set('ngrok-skip-browser-warning', 'true');
    return this.http.get<ResponseBackend>(this.apiUrl, { headers })
  }

  getBookByCategory(): Observable<ResponseBackend> {
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

    return this.http.get<ResponseBackend>(this.apiUrl, { headers, params })
  }

  searchBook(): Observable<ResponseBackend> {
    this.apiUrl = API_URL + 'product';
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');
    const searchData = localStorage.getItem('searchText')?.trim();
    if (searchData) {
      this.searchText = JSON.parse(searchData);
    }
    const params = new HttpParams().set('name', this.searchText);

    return this.http.get<ResponseBackend>(this.apiUrl, { headers, params })
  }

  deleteBook(bookId: number): Observable<ResponseBackend> {
    this.apiUrl = API_URL + `admin/product/${bookId}`;
    this.idToken = this.tokenService.getToken();
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Accept-Language', language)
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('ngrok-skip-browser-warning', 'true');
    return this.http.delete<ResponseBackend>(this.apiUrl, { headers });
  }

  onAddShoppingCart(productId: number): Observable<ResponseBackend> {
    this.apiUrl = API_URL + 'shopcart';
    this.idToken = this.tokenService.getToken();
    const loginData = {
      productId: productId,
    };
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');
    return this.http.post<ResponseBackend>(this.apiUrl, loginData, { headers });
  }

  getListCategory(): Observable<ResponseBackend> {
    this.apiUrl = API_URL + 'category';
    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      this.idToken = JSON.parse(tokenData);
    } else {
      this.idToken = '';
    }
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');
    return this.http.get<ResponseBackend>(this.apiUrl, { headers })
  }

  createBook(book: Book): Observable<ResponseBackend> {
    this.apiUrl = API_URL + 'admin/product';
    this.idToken = this.tokenService.getToken();
    const dataSubmit = {
      id: book?.id,
      name: book?.name,
      price: book?.price,
      quantity: book?.quantity,
      description: book?.description,
      category: book?.category,
      imageUrl: book?.imageUrl,
      author: book?.author,
    }

    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');

    return this.http.post<ResponseBackend>(this.apiUrl, dataSubmit, { headers })
  }

  updateBook(book: Book): Observable<ResponseBackend> {
    this.apiUrl = API_URL + 'admin/product';
    this.idToken = this.tokenService.getToken();
    const dataSubmit = {
      id: book?.id,
      name: book?.name,
      price: book?.price,
      quantity: book?.quantity,
      description: book?.description,
      category: book?.category,
      imageUrl: book?.imageUrl,
      author: book?.author,
    }
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');
    return this.http.put<ResponseBackend>(this.apiUrl, dataSubmit, { headers });
  }

  getBookInShopCart(): Observable<ResponseBackend> {
    this.idToken = this.tokenService.getToken();
    const language = navigator.language;
    this.apiUrl = API_URL + 'shopcart';
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');
    return this.http.get<ResponseBackend>(this.apiUrl, {headers});
  }

  removeFromCart(book: Book): Observable<ResponseBackend> {
    this.idToken = this.tokenService.getToken();
    const language = navigator.language;
    this.apiUrl = API_URL + `shopcart/${book.id}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');
    return this.http.delete<ResponseBackend>(this.apiUrl, {headers})
  }

  getRanking(): Observable<ResponseBackend> {
    this.idToken = this.tokenService.getToken();
    const language = navigator.language;
    this.apiUrl = API_URL + `product/ranking`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');
    return this.http.get<ResponseBackend>(this.apiUrl, {headers});
  }
}