import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { threadId } from 'node:worker_threads';
import { Cart } from 'src/app/models/cart';
import { Item } from 'src/app/models/item.module';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';
import { MembersService } from 'src/app/services/members.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-user-cart-row',
  templateUrl: './user-cart-row.component.html',
  styleUrls: ['./user-cart-row.component.css']
})
export class UserCartRowComponent implements OnInit {
  @Output() valueChange = new EventEmitter();

  @Input('s') data: Cart;
  items: Array<Item>
  quantity = new FormControl();
  UserID: number;
  constructor(private itemserves:ItemsService,private authserves:AuthService,private orderserves:OrdersService,private memberservoce:MembersService,private route: Router) { }
  ngOnInit(): void {
    this.authserves.userstate().subscribe(x => {
      if (x != "user") {
        this.route.navigateByUrl('/home');
      }
    });
    this.itemserves.getAllItems().subscribe(x => this.items = x);
    this.quantity.setValue(this.data.Quantity);
    let cokk = this.authserves.getCookie('name');
    this.memberservoce.getUserID(cokk).subscribe(x => this.UserID = x);
  }
  getName() {
    if (this.items == undefined) return;
    let name = "";
    this.items.forEach(item => {
      if (item.ID == this.data.ItemID) name = item.Name;
    });
    return name;
  }
  getPrice() {
    if (this.items == undefined) return;
    let price = 0;
    this.items.forEach(item => {
      if (item.ID == this.data.ItemID) price = item.Price;
    });
    return price;
  }

  getFullPrice() {
    if (this.items == undefined) return;
    let price = 0;
    this.items.forEach(item => {
      if (item.ID == this.data.ItemID) price = item.Price;
    });
    return price *this.data.Quantity;
  }
  increment() {
    
    this.quantity.setValue(this.quantity.value + 1);
    let quantity = this.quantity.value;
    this.data.Quantity = quantity;
    let obj = {
      UserID: this.UserID,
      ItemID: this.data.ItemID,
      Quantity: this.data.Quantity,
      Descr: this.data.Descr
    }
    this.orderserves.UpdateCart(obj).subscribe(x=>this.valueChange.emit());
  }
  decrement() {
    let x = this.quantity.value - 1 <= 0 ? 1 : this.quantity.value-1;
    this.quantity.setValue(x);
    let quantity = this.quantity.value;
    this.data.Quantity = quantity;
    let obj = {
      UserID: this.UserID,
      ItemID: this.data.ItemID,
      Quantity: this.data.Quantity,
      Descr: this.data.Descr
    }
    this.orderserves.UpdateCart(obj).subscribe(x=>this.valueChange.emit());
    

  }
  onDelete() {
    let obj = {
      UserID: this.UserID,
      ItemID: this.data.ItemID
    }
    this.orderserves.UpdateCartDelete(obj).subscribe();
    window.location.reload();
  }


}
