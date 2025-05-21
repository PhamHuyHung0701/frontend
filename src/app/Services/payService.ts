import { HttpClient, HttpHeaders } from "@angular/common/http"
import { API_URL } from "../app.config";
import { TokenService } from "./tokenService";
import { Observable } from "rxjs";
import { ResponseBackend } from "../Models/response";

export class PayService{
    constructor(private http: HttpClient) { 
    }
    apiUrl: string | undefined;
    idToken: string | undefined;
    tokenService: TokenService = new TokenService();
    submitPayment(selectedBooks: any[], totalPrice: number, address: string, phone: string): Observable<ResponseBackend> {

        this.idToken = this.tokenService.getToken();
        this.apiUrl = API_URL + 'bill'
        const data = {
          products: selectedBooks,
          totalPrice: totalPrice,
          address: address,
          phoneNumber: phone
        };
        const language = navigator.language;
        const headers = new HttpHeaders()
          .set('Accept-Language', language)
          .set('Authorization', `Bearer ${this.idToken}`)
          .set('ngrok-skip-browser-warning', 'true');
        return this.http.post<ResponseBackend>(this.apiUrl, data, {headers});
      }
}