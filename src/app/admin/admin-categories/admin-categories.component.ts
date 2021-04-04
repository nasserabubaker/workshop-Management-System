import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/categore.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategorieServesService } from 'src/app/services/categorie-serves.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  filedata: any;
  fileEvent(e){
    this.filedata = e.target.files[0];
}
  constructor(private authservice:AuthService , private categorieserves: CategorieServesService, private route: Router,private http:HttpClient) { }
  categores: Array<Categorie>;
  newcat: boolean = false;
  Catname = new FormControl();
  Pic = new FormControl();
  ngOnInit(): void {
    this.authservice.userstate().subscribe(x => {
      if (x != "admin") {
        this.route.navigateByUrl('/home');
      }
    });
    this.categorieserves.getCategories().subscribe(x => this.categores = x);

  }
  showNewCat() {
    if (this.newcat) {
      this.newcat = false;
    }
    else {
      this.newcat = true;
    }
  }


  onSubmitform(f: NgForm) {
    let done = true;
    let name = this.Catname.value;
    let pic = this.Pic.value;
    if (name==null) {
      done = false;
      alert("اسم التصنيف فارغ");
    }
    if (pic == null) {
      done = false;
      alert("لم ترفق صورة");
    }
    if (done) {
      pic = pic.split("\\");
      pic = "photos/"+pic[pic.length - 1];
      let obj = {
        name: name,
        pic: pic
      }
      this.categorieserves.newCategorie(obj).subscribe();
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
    

  
  }

}
