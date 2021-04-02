import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl('');
  password = new FormControl('');
  islogin: any;
  constructor(private authservice:AuthService ,   private route:Router) { }
  wrong: boolean = false;
  ngOnInit(): void {
    let cookies: string = this.authservice.getCookie('name');
    if (cookies !=null) {
      this.route.navigateByUrl('/home');
    }
    
  }
  logIn() {
    let name = this.username.value;
    let pass = this.password.value;
    let obj = {
      "user" : name,
      "pass" : pass
    }
    let value = 0;
    this.authservice.checkLoginInfo(obj).subscribe(x=>this.showWrong(x));

  }

  showWrong(cookies) {
    if (cookies == null) {
      this.wrong = true;

    }
    else {
      window.location.reload();
    }
  }
  

}
