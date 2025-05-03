import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { SearchpageComponent } from './Components/searchpage/searchpage.component';
import { SearchErrorComponent } from './Components/search-error/search-error.component';
import { BookinfoComponent } from './Components/bookinfo/bookinfo.component';
import { SearchCategotyComponent } from './Components/search-categoty/search-categoty.component';
import { ShopCartComponent } from './Components/shop-cart/shop-cart.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { BookManageComponent } from './Components/book-manage/book-manage.component';
import { CustomerInfoComponent } from './Components/customer-info/customer-info.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'searchpage', component: SearchpageComponent },
    { path: 'searcherror', component: SearchErrorComponent },
    { path: 'bookdetail', component: BookinfoComponent },
    { path: 'searchcategory', component: SearchCategotyComponent },
    { path: 'shopcart', component: ShopCartComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'bookmanage', component: BookManageComponent },
    { path: 'customerinfo', component: CustomerInfoComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
