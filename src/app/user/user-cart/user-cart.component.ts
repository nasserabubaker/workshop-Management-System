import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { copyFileSync } from 'node:fs';
import { Cart } from 'src/app/models/cart';
import { Item } from 'src/app/models/item.module';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';
import { MembersService } from 'src/app/services/members.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  cart: Array<Cart>
  UserID: number;
  total: number = 0;
  items: Array<Item>;
  descr = new FormControl('');
  constructor(private authserves :AuthService,private orderserves:OrdersService,private memberserves:MembersService,private itemserves:ItemsService,private route: Router) { }

  ngOnInit(): void {
    this.authserves.userstate().subscribe(x => {
      if (x != "user") {
        this.route.navigateByUrl('/home');
      }
    });
    let cok = this.authserves.getCookie('name');
    this.memberserves.getUserID(cok).subscribe(x => {
      this.UserID = x;
      if (x != undefined) {
        this.orderserves.getCartData(x).subscribe(x => {
          console.log(x)
          this.cart = x;
          this.itemserves.getAllItems().subscribe(y => {
            this.items = y;
            x.forEach(order => {
              let price = 0;
              y.forEach(item => {
                if (item.ID == order.ItemID) price = item.Price;
              });
              this.total += price * order.Quantity;
            })
          })

        })
      }
    })
  }


  onValueChange() {
    let cok = this.authserves.getCookie('name');
    this.total = 0;
    this.memberserves.getUserID(cok).subscribe(x => {
    
      if (x != undefined) {
        this.orderserves.getCartData(x).subscribe(x => {
          this.cart = x;
          this.itemserves.getAllItems().subscribe(y => {
            this.items = y;
            x.forEach(order => {
              let price = 0;
              y.forEach(item => {
                if (item.ID == order.ItemID) price = item.Price;
              });
              this.total += price * order.Quantity;
            })
          })

        })
      }
    })

  }
  sumbit() {
    let Amount = (this.total);
    let Descr = (this.descr.value);
    let date = new Date()
    if (Amount == 0) {
      alert("لا يمكنك تسليم طلبية فارغة")
      return;
    }
    let UserID = this.UserID;

    let obj= {
      UserID: UserID,
      Descr: Descr,
      Date: date,
      Amount:Amount
    }
    this.orderserves.newOrder(obj).subscribe(x => {
      
      let OrderID = x['insertId'];
      this.cart.forEach(element => {

        let ItemID = element.ItemID;
        let Quantity = element.Quantity;
        let Descr = element.Descr;
        let obj = {
          OrderID: OrderID,
          ItemID: ItemID,
          Quantity: Quantity,
          Descr: Descr
        }

        this.orderserves.newOrderData(obj).subscribe();

      });
      let obj2 = {
        UserID: this.UserID
      }
      this.orderserves.emptyCart(obj2).subscribe(x=>window.location.reload());
    }
    );
  }
  
  
}
