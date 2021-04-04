import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { Order } from '../models/order';
import { PannedOrder } from '../models/PannedOrder';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }
  getPannedOrders(): Observable<Order[]>{
    return this.http.get<Order[]>("http://localhost:3000/api/orders/getpannedorders");
  }
  DeleteOrder(obj): Observable<Order[]>{
    return this.http.put<Order[]>("http://localhost:3000/api/orders/deleteOrder",obj);
  }
  changeState(obj): Observable<Order[]>{
    return this.http.post<Order[]>("http://localhost:3000/api/orders/changeState",obj);
  }
  getPannedOrderData(OrderID): Observable<PannedOrder[]>{
    return this.http.get<PannedOrder[]>("http://localhost:3000/api/orders/getPannedOrderData"+OrderID);
  }
  updateQuantity(obj) {
    return this.http.put("http://localhost:3000/api/orders/updateQuantity",obj);
  }
  getAllOrders():Observable<Order[]> {
    return this.http.get<Order[]>("http://localhost:3000/api/orders/getAllOrders");
  }
  checkCart(obj):Observable<Cart[]> {
    return this.http.post<Cart[]>("http://localhost:3000/api/orders/checkCart",obj);
  }   
  
  addToCart(obj) {
    return this.http.post("http://localhost:3000/api/orders/addToCart",obj);
  }
  getCartData(UserID) :Observable<Cart[]> {
    return this.http.get<Cart[]>("http://localhost:3000/api/orders/getCartData"+UserID);
  }
  newOrder(obj)  {
    return this.http.post("http://localhost:3000/api/orders/newOrder",obj);
  }
  newOrderData(obj)  {
    return this.http.post("http://localhost:3000/api/orders/newOrderData",obj);
  }
  
  emptyCart(obj)  {
    return this.http.put("http://localhost:3000/api/orders/emptyCart",obj);
  }
  UpdateCart(obj)  {
    return this.http.put("http://localhost:3000/api/orders/UpdateCart",obj);
  }
  UpdateCartDelete(obj)  {
    return this.http.put("http://localhost:3000/api/orders/UpdateCartDelete",obj);
  }
  getUserOrders(UserID) :Observable<Order[]>  {
    return this.http.get<Order[]>("http://localhost:3000/api/orders/getUserOrders"+UserID);
  }
  
  
  
  
}

