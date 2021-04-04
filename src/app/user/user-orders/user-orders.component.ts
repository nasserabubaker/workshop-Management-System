import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { MembersService } from 'src/app/services/members.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  Orders:Array<Order>
  constructor(private orderserves:OrdersService,private authservice:AuthService,private memberservice:MembersService,private route: Router) { }
  
  ngOnInit(): void {
    this.authservice.userstate().subscribe(x => {
      if (x != "user") {
        this.route.navigateByUrl('/home');
      }
    });
    let UserName = this.authservice.getCookie('name');
    this.memberservice.getUserID(UserName).subscribe(x => {
      this.orderserves.getUserOrders(x).subscribe(x => this.Orders = x);
    })
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

}
