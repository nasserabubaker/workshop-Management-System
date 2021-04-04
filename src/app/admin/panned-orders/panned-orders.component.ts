import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInfo } from 'node:os';
import { Member } from 'src/app/models/member.model';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { MembersService } from 'src/app/services/members.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-panned-orders',
  templateUrl: './panned-orders.component.html',
  styleUrls: ['./panned-orders.component.css']
})
export class PannedOrdersComponent implements OnInit {
  orders:Array<Order>
  members: Array<Member>
  membername: string = "";
  constructor(private authservice:AuthService ,private route:Router,private orderservice:OrdersService,private memberservice :MembersService) {
    
  }

  ngOnInit(): void {
    this.authservice.userstate().subscribe(x => {
      if (x != "admin") {
        this.route.navigateByUrl('/home');
      }
    });
    this.memberservice.getAllMembers().subscribe(x => this.members = x);
    this.orderservice.getPannedOrders().subscribe(x => this.orders = x);
  }
  get_member_name(UserID) {
    
    let name = "";
    this.members.forEach(member => {
      if (member.UserId == UserID) {
        name = member.FullName;
        }
    });
    return name;
  }
  getdate(dates) {
    var date = new Date(dates);
    var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    var days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
    var delDateString = days[date.getDay()] + ', ' + date.getDate() + ' ' + months[date.getMonth()] + ', ' + date.getFullYear();
    
    return (delDateString); 
  }
  delteOrder(OrderID) {
    let obj = {
      OrderID: OrderID
    }
    this.orderservice.DeleteOrder(obj).subscribe(x => this.orders = x);
  }
  changeState(OrderID) {
    let obj = {
      OrderID: OrderID,
      type:0
    }
    this.orderservice.changeState(obj).subscribe(x => this.orders = x);
  }

}
