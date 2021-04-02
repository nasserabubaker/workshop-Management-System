import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
  
export class NavbarComponent implements OnInit {
  islogin: any;
  usertype: string = "admin";
  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    this.authservice.checkLogin().subscribe(x => this.islogin = x);
    this.authservice.userstate().subscribe(x => this.usertype = x);
  }
  logout() {
    this.authservice.logout().subscribe();
    this.refresh();
  }



// Used to toggle the menu on small screens when clicking on the menu button
toggleFunction() {
      var x = document.getElementById("navDemo");
      if (x.className.indexOf("w3-show") == -1) {
          x.className += " w3-show";
      } else {
          x.className = x.className.replace(" w3-show", "");
      }
}
  refresh() {
    window.location.reload();
  }


}

