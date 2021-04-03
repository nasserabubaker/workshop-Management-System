import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}

