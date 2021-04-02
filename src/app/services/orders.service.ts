import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

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
}

