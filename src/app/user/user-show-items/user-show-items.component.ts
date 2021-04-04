import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.module';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-user-show-items',
  templateUrl: './user-show-items.component.html',
  styleUrls: ['./user-show-items.component.css']
})
export class UserShowItemsComponent implements OnInit {
  CategorieID: number;
  CategorieName: string;
  items:Array<Item>
  constructor(private route: ActivatedRoute,private itemserves:ItemsService,private routee: Router,private authservice:AuthService) { }

  ngOnInit(): void {
    this.authservice.userstate().subscribe(x => {
      if (x != "user") {
        this.routee.navigateByUrl('/home');
      }
    });
    
    const routeParams = this.route.snapshot.paramMap;
    this.CategorieID = Number(routeParams.get('CategorieID'))
    this.CategorieName = String(routeParams.get('Name'));
    this.itemserves.getItemsForShow(this.CategorieID).subscribe(x => this.items = x);

  }

}
