import {CommonModule} from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from '../../../app.config';
import { TokenService } from '../../../Services/tokenService';


export interface Menu {
  id: number;
  name: string;
  children: Menu[];
}

export interface Data {
  menu: Menu[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  @Input() searchText: string = '';
  menu: Menu[] = [];
  apiUrl: string = ''; // URL to web api
  code: number = 0;
  message: string = '';
  idToken: string = '';
  data: Data[] = [];
  tokenService:TokenService = new TokenService();

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.idToken = this.tokenService.getToken();
    const language = navigator.language;
    this.apiUrl = API_URL + 'menu/homepage';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.idToken}`).set('Accept-Language', language).set('ngrok-skip-browser-warning', 'true');
    this.http.get(this.apiUrl, {headers}).subscribe(
      (response: any) => {
        this.message = response.message;
        this.code = response.code;
        if (this.code === 1) {
          this.menu = response.object.menu;
          localStorage.setItem('menu', JSON.stringify(this.menu));
        } else {
          console.log(response.message);
        }
      },
      error => {
        console.log("Error: " + error.message);
      }
    )
  }

  isLoggedIn() {
    return this.idToken !== null && this.idToken.trim() !== '';
  }

  onClickLevel1(menu: Menu) {
    if (menu.id === 16) {
      this.router.navigate(['/bookmanage']);
    }
    if (menu.id === 27) {
      this.router.navigate(['/accountmanage']);
    }
    if(menu.id === 33) {
      this.router.navigate(['/billmanage']);
    }
  }

  onClickLevel2(event: Event, menu1: Menu, menu2: Menu) {
    if (menu1.id === 1) {
      localStorage.setItem('searchCategory', JSON.stringify(menu2.name));
      if (this.router.url === '/searchcategory') {
        window.location.reload();
      } else {
        this.router.navigate(['/searchcategory']);
      }
    }
  }

  onClickLevel3(event: Event, menu1: Menu, menu2: Menu, menu3: Menu) {
    event.stopPropagation();
    alert("3")

  }

  onSearch() {
    localStorage.setItem('searchText', JSON.stringify(this.searchText));
    if (this.router.url === '/searchpage') {
      window.location.reload();
    } else {
      this.router.navigate(['/searchpage']);
    }
  }

  onLogOut() {
    localStorage.setItem('idToken', '');
    if (this.router.url === '/home') {
      window.location.reload();
    } else {
      this.router.navigate(['/home']);
    }
  }
}
