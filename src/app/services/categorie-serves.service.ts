import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Categorie} from '../models/categore.model'
@Injectable({
  providedIn: 'root'
})
export class CategorieServesService {
  constructor(private http: HttpClient) { }
  getCategories():Observable<Categorie[]> {
    return this.http.get<Categorie[]>('http://localhost:3000/api/categores');
  }
  getAllCategoriesForShow():Observable<Categorie[]> {
    return this.http.get<Categorie[]>('http://localhost:3000/api/categorie/getAllCategoriesForShow');
  }
  
  changevisible(id) : Observable<Categorie> {

    
    return this.http.put<Categorie>('http://localhost:3000/api/categorie/editvisible', id, {
      withCredentials: true
    });
  }

  deleteCategore(id)  {
    return this.http.post('http://localhost:3000/api/categorie/delete', id);
  }

  updateCategorie(obj){

    
    return this.http.put('http://localhost:3000/api/categorie/Update', obj, {
      withCredentials: true
    });
  }

  newCategorie(obj){

    
    return this.http.post('http://localhost:3000/api/categorie/add', obj, {
      withCredentials: true
    });
  }
}
