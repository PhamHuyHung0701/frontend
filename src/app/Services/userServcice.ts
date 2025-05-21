import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL } from "../app.config";
import { TokenService } from "./tokenService";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ResponseBackend } from "../Models/response";
import { Observable } from "rxjs/internal/Observable";
import { User } from "../Models/user";

export class UserService {
  constructor(private http: HttpClient) {
  }

  apiUrl: string | undefined;
  idToken: string | undefined;
  tokenService: TokenService = new TokenService();
  object: ResponseBackend = { message: '', object: null, code: 0 };

  getCustomerInfo(): Observable<ResponseBackend> {
    this.apiUrl = API_URL + 'user/info';
    this.idToken = this.tokenService.getToken();
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');
    return this.http.get<ResponseBackend>(this.apiUrl, { headers })
  }

  editUser(name: string, address: string): Observable<ResponseBackend> {
    this.apiUrl = API_URL + 'user';
    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      this.idToken = JSON.parse(tokenData);
    } else {
      this.idToken = '';
    }
    const language = navigator.language;
    const changeUserData = {
      name: name,
      address: address,
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');

    return this.http.put<ResponseBackend>(this.apiUrl, changeUserData, { headers })
  }

  changePassword(oldPassword: string, newPassword: string, confirmPassword: string): Observable<ResponseBackend> {
    this.apiUrl = API_URL + 'user/change-password';
    this.idToken = this.tokenService.getToken();
    const changePasswordData = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };

    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('Accept-Language', language)
      .set('ngrok-skip-browser-warning', 'true');

    return this.http.put<ResponseBackend>(this.apiUrl, changePasswordData, { headers })
  }

  getAllUser(): Observable<ResponseBackend> {
    this.idToken = this.tokenService.getToken();
    this.apiUrl = API_URL + 'admin/user';
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Accept-Language', language)
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('ngrok-skip-browser-warning', 'true');
    return this.http.get<ResponseBackend>(this.apiUrl, { headers });
  }

  resetPassword(user: User): Observable<ResponseBackend> {
    this.apiUrl = API_URL + `admin/user/reset-password/${user.id}`
    this.idToken = this.tokenService.getToken();
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Accept-Language', language)
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('ngrok-skip-browser-warning', 'true');
    return this.http.put<ResponseBackend>(this.apiUrl, null, { headers })
  }

  revokeAdmin(user: User): Observable<ResponseBackend> {
    this.apiUrl = API_URL + `admin/user/remove-role-admin/${user.id}`
    this.idToken = this.tokenService.getToken();
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Accept-Language', language)
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('ngrok-skip-browser-warning', 'true');

    return this.http.put<ResponseBackend>(this.apiUrl, null, { headers })
  }

  grantAdmin(user: User): Observable<ResponseBackend> {
    this.apiUrl = API_URL + `admin/user/add-role-admin/${user.id}`
    this.idToken = this.tokenService.getToken();
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Accept-Language', language)
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('ngrok-skip-browser-warning', 'true');
    return this.http.put<ResponseBackend>(this.apiUrl, null, { headers })
  }

  deleteAccount(user: User): Observable<ResponseBackend> {
    this.apiUrl = API_URL + `admin/user/${user.id}`
    this.idToken = this.tokenService.getToken();
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Accept-Language', language)
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('ngrok-skip-browser-warning', 'true');
    return this.http.delete<ResponseBackend>(this.apiUrl, { headers })
  }

  searchAccountByEmail(searchText: string): Observable<ResponseBackend> {
    this.apiUrl = API_URL + `admin/user/${searchText}`;
    this.idToken = this.tokenService.getToken();
    const language = navigator.language;
    const headers = new HttpHeaders()
      .set('Accept-Language', language)
      .set('Authorization', `Bearer ${this.idToken}`)
      .set('ngrok-skip-browser-warning', 'true');
    return this.http.get<ResponseBackend>(this.apiUrl, { headers });
  }
}