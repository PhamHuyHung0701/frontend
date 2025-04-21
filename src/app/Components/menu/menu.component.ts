import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from '../../app.config';

export interface Menu {
  id: number;
  name: string;
  children: Menu[];
}

export interface Data
{
  menu: Menu[];
}
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  
  @Input() searchText: string ='';
  menu: Menu[] = [];
  apiUrl: string = ''; // URL to web api
  code: number=0;
  message: string='';
  idToken: string='';
  data: Data[]=[];
  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit() {
    const tokenData = localStorage.getItem('idToken')?.trim();
    if(tokenData)
    {
      this.idToken=JSON.parse(tokenData);
    }
    else
    {
      this.idToken='';
    }
    const language=navigator.language;
    this.apiUrl=API_URL+'menu/homepage';
      // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.idToken}`).set('Accept-Language', language);
      const headers = new HttpHeaders().set('Authorization',`Bearer ${this.idToken}`).set('Accept-Language', language).set('ngrok-skip-browser-warning', 'true');
      this.http.get(this.apiUrl,{headers}).subscribe(
        (response: any)=>{
          this.message = response.message;
          this.code = response.code;
          if(this.code === 1)
          {
            this.menu= response.object.menu;
            localStorage.setItem('menu', JSON.stringify(this.menu));
          }
          else{
            console.log(response.message);
          }
        },
        error => {
          console.log("Error: "+error.message);
        } 
      )
  }

  onClickLevel1(menu: Menu){
       if(menu.id === 16)
       {
         this.router.navigate(['/bookmanage']);
       }
  }
  onClickLevel2(event: Event,menu1: Menu,menu2: Menu){
          if (menu1.id === 1)
          {
            localStorage.setItem('searchCategory', JSON.stringify(menu2.name));
            if (this.router.url === '/searchcategory') {
              window.location.reload();
            } else {
              this.router.navigate(['/searchcategory']);
            }
          }
  }
  onClickLevel3(event: Event,menu1: Menu,menu2: Menu,menu3: Menu){
    event.stopPropagation();
    alert("3")

  }

  isLoggedIn(): boolean {
    return this.idToken !== null && this.idToken.trim() !== '';
  }

  onSearch() {
    localStorage.setItem('searchText', JSON.stringify(this.searchText));
    if (this.router.url === '/searchpage') {
      window.location.reload();
    } else {
      this.router.navigate(['/searchpage']);
    }
  }
}
