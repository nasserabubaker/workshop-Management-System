import { Component, Input, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categore.model';
import { CategorieServesService } from 'src/app/services/categorie-serves.service';
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  @Input('s') categorieInfo: Categorie;
  constructor(private categorieserves:CategorieServesService) { }
  ngOnInit(): void {
  }


}
