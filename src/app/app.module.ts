import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './main_components/navbar/navbar.component';
import { LoginComponent } from './main_components/login/login.component';
import { FormControl, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainpageComponent } from './main_components/mainpage/mainpage.component';
import { FooterComponent } from './main_components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { CategoriesComponent } from './main_components/categories/categories.component';
import { CategorieComponent } from './main_components/categorie/categorie.component';
import { ItemComponent } from './main_components/item/item.component';
import { ItemsComponent } from './main_components/items/items.component';
import { CategorieServesService } from './services/categorie-serves.service';
import { ItemsService } from './services/items.service';
import { AdminCategorieComponent } from './admin/admin-categorie/admin-categorie.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { FormsModule }   from '@angular/forms';
import { MembersComponent } from './admin/members/members.component';
import { MembersService } from './services/members.service';
import { sha1 } from '@angular/compiler/src/i18n/digest';
import { AdminitemsComponent } from './admin/adminitems/adminitems.component';
import { AdminItemComponent } from './admin/admin-item/admin-item.component';
import { PannedOrdersComponent } from './admin/panned-orders/panned-orders.component';
import { PannedOrderComponent } from './admin/panned-order/panned-order.component';
import { PannedOrderRowComponent } from './admin/panned-order-row/panned-order-row.component';
import { AllOrdersComponent } from './admin/all-orders/all-orders.component';
import { OrderShowComponent } from './admin/order-show/order-show.component';
import { UserCategoriesComponent } from './user/user-categories/user-categories.component';
import { UserShowItemsComponent } from './user/user-show-items/user-show-items.component';
import { UserShowItemComponent } from './user/user-show-item/user-show-item.component';
import { UserCartComponent } from './user/user-cart/user-cart.component';
import { UserCartRowComponent } from './user/user-cart-row/user-cart-row.component';
import { UserOrdersComponent } from './user/user-orders/user-orders.component';
import { ContactUsComponent } from './user/contact-us/contact-us.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    MainpageComponent,
    FooterComponent,
    CategoriesComponent,
    CategorieComponent,
    ItemsComponent,
    ItemComponent,
    AdminCategorieComponent,
    AdminCategoriesComponent,
    MembersComponent,
    AdminitemsComponent,
    AdminItemComponent,
    PannedOrdersComponent,
    PannedOrderComponent,
    PannedOrderRowComponent,
    AllOrdersComponent,
    OrderShowComponent,
    UserCategoriesComponent,
    UserShowItemsComponent,
    UserShowItemComponent,
    UserCartComponent,
    UserCartRowComponent,
    UserOrdersComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
    
    

  ],
  providers: [AuthService,CategorieServesService,ItemsService,MembersService,ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
