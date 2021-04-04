import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { PannedOrder } from 'src/app/models/PannedOrder';
import { AuthService } from 'src/app/services/auth.service';
import { MembersService } from 'src/app/services/members.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-panned-order',
  templateUrl: './panned-order.component.html',
  styleUrls: ['./panned-order.component.css']
})
export class PannedOrderComponent implements OnInit {

  constructor(private authservice:AuthService ,   private routee:Router ,private route:ActivatedRoute,private orderserves:OrdersService,private memberserves:MembersService) { }
  orderData: Array<PannedOrder>
  OrderID: number;
  members:Array<Member>
  ngOnInit(): void {
    this.authservice.userstate().subscribe(x => {
      if (x != "admin") {
        this.routee.navigateByUrl('/home');
      }
    });
    const routeParams = this.route.snapshot.paramMap;
    this.OrderID = Number(routeParams.get('OrderId'));
    this.orderserves.getPannedOrderData(this.OrderID).subscribe(x => this.orderData = x);
    this.memberserves.getAllMembers().subscribe(x => this.members = x);
  }

}
