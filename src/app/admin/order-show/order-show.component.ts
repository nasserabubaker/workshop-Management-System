import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.module';
import { Member } from 'src/app/models/member.model';
import { Order } from 'src/app/models/order';
import { PannedOrder } from 'src/app/models/PannedOrder';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';
import { MembersService } from 'src/app/services/members.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-show',
  templateUrl: './order-show.component.html',
  styleUrls: ['./order-show.component.css']
})
export class OrderShowComponent implements OnInit {
  OrderID: number;
  OrderData: Array<PannedOrder>;
  members: Array<Member>
  items:Array<Item>
  constructor( private route: ActivatedRoute,private orderserves:OrdersService,private memberservice:MembersService,private itemserves:ItemsService,private routee: Router,private authservice:AuthService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.OrderID = Number(routeParams.get('OrderID'));
    this.orderserves.getPannedOrderData(this.OrderID).subscribe(x => this.OrderData = x);
    this.itemserves.getAllItems().subscribe(x => this.items = x);
    this.authservice.userstate().subscribe(x => {
      if (x != "admin"&&x!='user') {
        this.routee.navigateByUrl('/home');
      }
    });
  }
 
  getprice(itemid,quantity=1) {
    if (this.items == undefined) return;
    let price = 0;
    this.items.forEach(element => {
      if (element.ID == itemid) price = element.Price;
    });
    return price * quantity;
    
  }

  getName(itemid) {
    if (this.items == undefined) return;
    let name ="";
    this.items.forEach(element => {
      if (element.ID == itemid) name = element.Name;
    });
    return name;
    
  }

  getPic(itemid) {
    if (this.items == undefined) return;

    let pic = "";

    this.items.forEach(element => {
      if (element.ID == itemid) pic = element.Pic;
    });
    return pic;
  }
}
