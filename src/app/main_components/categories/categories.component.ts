import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/categore.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategorieServesService } from 'src/app/services/categorie-serves.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categorieserves:CategorieServesService,private authservice:AuthService,private route:Router) { }
  categores: Array<Categorie>;

  ngOnInit(): void {
    if (this.authservice.getCookie("name") != null) {
      this.route.navigateByUrl('/home');
    }
    this.categorieserves.getCategories().subscribe(x => this.categores = x);
  }

}
