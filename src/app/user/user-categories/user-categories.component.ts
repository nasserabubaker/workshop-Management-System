import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/categore.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategorieServesService } from 'src/app/services/categorie-serves.service';

@Component({
  selector: 'app-user-categories',
  templateUrl: './user-categories.component.html',
  styleUrls: ['./user-categories.component.css']
})
export class UserCategoriesComponent implements OnInit {
  categories: Array<Categorie>

  constructor(private categorieserves:CategorieServesService,private route: Router,private authservice:AuthService) { }

  ngOnInit(): void {
    this.authservice.userstate().subscribe(x => {
      if (x != "user") {
        this.route.navigateByUrl('/home');
      }
    });
    this.categorieserves.getAllCategoriesForShow().subscribe(x => this.categories = x);
  }

}
