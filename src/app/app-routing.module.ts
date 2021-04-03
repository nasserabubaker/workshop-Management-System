import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategorieComponent } from './admin/admin-categorie/admin-categorie.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminitemsComponent } from './admin/adminitems/adminitems.component';
import { AllOrdersComponent } from './admin/all-orders/all-orders.component';
import { MembersComponent } from './admin/members/members.component';
import { PannedOrderComponent } from './admin/panned-order/panned-order.component';
import { PannedOrdersComponent } from './admin/panned-orders/panned-orders.component';
import { CategoriesComponent } from './main_components/categories/categories.component';
import { ItemComponent } from './main_components/item/item.component';
import { ItemsComponent } from './main_components/items/items.component';
import { LoginComponent } from './main_components/login/login.component';
import { MainpageComponent } from './main_components/mainpage/mainpage.component';

const routes: Routes = [
  {path :"login",component:LoginComponent},
  { path: "home", component: MainpageComponent },
  { path: "", component: MainpageComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "items/:CategorieID/:CategorieName", component: ItemsComponent },
  {path:"adminCategories",component:AdminCategoriesComponent },
  {path:"members",component:MembersComponent },
  {path:"adminItems",component:AdminitemsComponent },
  { path: "PannedOrders", component: PannedOrdersComponent },
  { path: "Pannedorders/:OrderId", component: PannedOrderComponent },
  { path: "allorders", component: AllOrdersComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
