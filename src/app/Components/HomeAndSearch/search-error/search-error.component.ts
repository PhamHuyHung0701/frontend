import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MenuComponent} from "../../Share/menu/menu.component";
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { EndPageComponent } from "../../Share/end-page/end-page.component";

@Component({
  selector: 'app-search-error',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, MenuComponent, EndPageComponent],
  templateUrl: './search-error.component.html',
  styleUrl: './search-error.component.scss'
})
export class SearchErrorComponent {
  constructor(private router: Router) {
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
