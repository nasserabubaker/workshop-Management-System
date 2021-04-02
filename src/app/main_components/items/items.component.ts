import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item.module';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  CategorieID: number;
  CategorieName: string;
  constructor(  private route: ActivatedRoute,private itemserves:ItemsService ) {

  }
  Items:Array<Item>

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
     this.CategorieID = Number(routeParams.get('CategorieID'));
    this.CategorieName = String(routeParams.get('CategorieName'));
    this.itemserves.getItems(this.CategorieID).subscribe(x => this.Items = x);
  }

}
