import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { TokenService } from "./tokenService";
import { Observable } from "rxjs";
import { API_URL } from "../app.config";
import { ResponseBackend } from "../Models/response";

export class BillService {
    constructor(private http: HttpClient) {
    }

    apiUrl: string = '';
    idToken: string | undefined;
    tokenService: TokenService = new TokenService();

    getAllBills(): Observable<ResponseBackend> {
        this.apiUrl = API_URL + 'admin/bill';
        this.idToken = this.tokenService.getToken();
        const language = navigator.language;
        const headers = new HttpHeaders()
          .set('Accept-Language', language)
          .set('Authorization', `Bearer ${this.idToken}`)
          .set('ngrok-skip-browser-warning', 'true');
        return this.http.get<ResponseBackend>(this.apiUrl, { headers });
    }

    searchBill(email:string, fromDate:string,toDate:string, status:string):Observable<ResponseBackend> {
        this.apiUrl = API_URL + 'admin/bill/search';
        this.idToken = this.tokenService.getToken();
        const language = navigator.language;
        const headers = new HttpHeaders()
          .set('Accept-Language', language)
          .set('Authorization', `Bearer ${this.idToken}`)
          .set('ngrok-skip-browser-warning', 'true');
        const params = new HttpParams().set('email', email).set('fromDate', fromDate).set('toDate', toDate).set('status', status);
        return this.http.get<ResponseBackend>(this.apiUrl, { headers,params });
    }

    updateBillStatus(billId: number, status: string): Observable<ResponseBackend> {
        this.apiUrl = API_URL + 'admin/bill';
        this.idToken = this.tokenService.getToken();
        const language = navigator.language;
        const data ={
            id: billId,
            status: status
        }
        const headers = new HttpHeaders()
          .set('Accept-Language', language)
          .set('Authorization', `Bearer ${this.idToken}`)
          .set('ngrok-skip-browser-warning', 'true');
        return this.http.put<ResponseBackend>(this.apiUrl, data, { headers });
    }
}