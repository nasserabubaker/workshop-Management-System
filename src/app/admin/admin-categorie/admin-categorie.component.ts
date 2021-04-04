import {NgForm} from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/categore.model';
import { CategorieServesService } from 'src/app/services/categorie-serves.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-categorie',
  templateUrl: './admin-categorie.component.html',
  styleUrls: ['./admin-categorie.component.css']
})
export class AdminCategorieComponent implements OnInit {
  filedata: any;
  fileEvent(e){
    this.filedata = e.target.files[0];
    
}
  @Input('s') categorieInfo: Categorie;
  constructor(private authservice:AuthService ,   private routee:Router,private categorieserves: CategorieServesService, private route: Router,private http:HttpClient) { }
  edit: boolean = false;
  Catname = new FormControl();
  Pic = new FormControl();

  ngOnInit(): void {
    this.authservice.userstate().subscribe(x => {
      if (x != "admin") {
        this.route.navigateByUrl('/home');
      }
    });
    this.Catname.setValue(this.categorieInfo.Name);

  }
  edit_visible() {
    let obj = {
      "id": this.categorieInfo.ID
    }
    this.categorieserves.changevisible(obj).subscribe(x => this.categorieInfo = x[0]);
    if (this.categorieInfo.visible == 0) {
      alert("تم اظهار التصنيف");

    }
    else {
      alert("تم اخفاء التصنيف");

    }
  }
  delete_cat() {
    let obj = {
      "id": this.categorieInfo.ID
    }
    this.categorieserves.deleteCategore(obj).subscribe();
    alert("تم حذف التصنيف");
    window.location.reload();

  }
  editClick() {
    if (this.edit) {
      this.edit = false;
    }
    else {
      this.edit = true;
    }
    
  }

     /* Upload button functioanlity */
  onSubmitform(f: NgForm) {
    let set = false;
    let name = this.Catname.value;
    if (name.length == 0) {
      alert("اسم التصنيف فارغ :( ");
      return;
    }
    let pic = this.Pic.value;
    if (pic == null) {
      pic = this.categorieInfo.Pic;
    }
    else {
      let arr = pic.split("\\")
      pic = 'photos/'+arr[arr.length - 1];
      set = true;
    }
    let obj = {
      id: this.categorieInfo.ID,
      name: name,
      pic: pic
    }
    this.categorieserves.updateCategorie(obj).subscribe();
    if (set == true) {
       var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      myFormData.append('image', this.filedata);
      /* Image Post Request */
      this.http.post('http://localhost/save.php', myFormData, {
      headers: headers
      }).subscribe(data => {
       //Check success message
       console.log(data);
      });
    }
    window.location.reload();
  
  }
}
