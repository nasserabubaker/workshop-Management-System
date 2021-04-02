import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }


  checkLoginInfo(obj) : Observable<string>  {    
    return this.http.post<string>('http://localhost:3000/api/auth/login/', obj, {
      withCredentials: true
    });
  }

  
  checkLogin():Observable<string> {
    return this.http.get<string>('http://localhost:3000/api/auth/isLogin', {
      withCredentials: true // <=========== important!
    });
  }

  logout() {
    return this.http.get('http://localhost:3000/api/auth/logout',{
      withCredentials: true // <=========== important!
    });


  }

  userstate():Observable<string>{
    return this.http.get<string>("http://localhost:3000/api/auth/userstate", {
      withCredentials: true
    }
    );
  }
  
  getCookie(name: string): string {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;
  }
  
}
