import { unescapeIdentifier } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { MembersService } from 'src/app/services/members.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  orders: Array<Order>
  members:Array<Member>
  constructor(private authservice:AuthService ,   private route:Router,private OrdersService:OrdersService,private memberservice:MembersService) { }

  ngOnInit(): void {
    this.authservice.userstate().subscribe(x => {
      if (x != "admin") {
        this.route.navigateByUrl('/home');
      }
    });
    this.OrdersService.getAllOrders().subscribe(x => this.orders = x);
    this.memberservice.getAllMembers().subscribe(x => this.members = x);
  }
  getName(userid) {
    if (this.members == undefined) return;
    let name = "";
    this.members.forEach(element => {
      if (element.UserId == userid) name = element.FullName;
    });
    return name;
  }
  changeState(OrderID) {
    let obj = {
      OrderID: OrderID,
      type:1
    }
    this.OrdersService.changeState(obj).subscribe(x => this.orders = x);
  }
}
