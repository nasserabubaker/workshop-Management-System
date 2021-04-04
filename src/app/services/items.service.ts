import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.module';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }
  
  getItems(CategoriesId) : Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:3000/api/items' + CategoriesId);
  }
  getItemsForShow(CategoriesId) : Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:3000/api/items/getItemsForShow' + CategoriesId);
  }
  

  getAllItems() : Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:3000/api/items/getitems' );
  }
  addItem(obj) : Observable<Item[]> {
    return this.http.post<Item[]>('http://localhost:3000/api/items/additem',obj);
  }
  updateItem(obj)  {
    return this.http.put('http://localhost:3000/api/items/update',obj);
  }
  changevisible(id) : Observable<Item> {

    
    return this.http.put<Item>('http://localhost:3000/api/items/editvisible', id, {
      withCredentials: true
    });
  }
  deleteCategore(id)  {
    return this.http.post('http://localhost:3000/api/items/delete', id);
  }

}

