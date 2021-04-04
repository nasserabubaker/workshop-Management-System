import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http:HttpClient) { }
  getAllMembers(): Observable<Member[]>{
    return this.http.get<Member[]>('http://localhost:3000/api/members/getmembers');
    
  }
  getUserID(username):Observable <number>{
    return this.http.get<number>('http://localhost:3000/api/members/getUserID'+username);
    
  }
  
  deleteMember(obj) {
    return this.http.put('http://localhost:3000/api/members/deleteMember', obj);
  }
  editMember(obj) {
    return this.http.put('http://localhost:3000/api/members/update', obj);

  }
  checkUserName(obj){
    /*
    obj:{
    UserName:username
    }
     */

    return this.http.get('http://localhost:3000/api/members/checkusername'+obj['UserName']);

  }
  addNewUser(obj):Observable<Member[]> {
    return this.http.post<Member[]>('http://localhost:3000/api/members/newuser',obj);
  }
  
}

