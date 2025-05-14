import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MenuComponent} from "../menu/menu.component";
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-error',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, MenuComponent],
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
