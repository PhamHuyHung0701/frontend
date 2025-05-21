import { Routes } from '@angular/router';
import { AccountManageComponent } from './Components/AccountManage/account-manage/account-manage.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { BookManageComponent } from './Components/BookManage/book-manage/book-manage.component';
import { BookinfoComponent } from './Components/BookManage/bookinfo/bookinfo.component';
import { CustomerInfoComponent } from './Components/CustomerInfo/customer-info/customer-info.component';
import { HomeComponent } from './Components/HomeAndSearch/home/home.component';
import { SearchCategotyComponent } from './Components/HomeAndSearch/search-categoty/search-categoty.component';
import { SearchErrorComponent } from './Components/HomeAndSearch/search-error/search-error.component';
import { SearchpageComponent } from './Components/HomeAndSearch/searchpage/searchpage.component';
import { PaymentComponent } from './Components/ShopCardAndPayment/payment/payment.component';
import { ShopCartComponent } from './Components/ShopCardAndPayment/shop-cart/shop-cart.component';
import { BillDetailComponent } from './Components/ShopCardAndPayment/bill-detail/bill-detail.component';


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
  { path: 'accountmanage', component: AccountManageComponent },
  { path: 'billdetail', component: BillDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
