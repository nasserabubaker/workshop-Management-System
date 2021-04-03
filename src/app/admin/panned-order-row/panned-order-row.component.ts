import { unescapeIdentifier } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Item } from 'src/app/models/item.module';
import { PannedOrder } from 'src/app/models/PannedOrder';
import { ItemsService } from 'src/app/services/items.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-panned-order-row',
  templateUrl: './panned-order-row.component.html',
  styleUrls: ['./panned-order-row.component.css']
})
export class PannedOrderRowComponent implements OnInit {
  @Input('s') OrderData: PannedOrder
  quantityInput =  new FormControl('');

  ItemsData: Array<Item>;
  constructor(private itemserves:ItemsService,private orderserves:OrdersService) { }

  ngOnInit(): void {
    this.itemserves.getAllItems().subscribe(x => this.ItemsData = x);
  }
  getItemName(ItemID) {
    if (this.ItemsData == undefined) return;
    let name = "";
    this.ItemsData.forEach(item => {
      if (item.ID == ItemID) name = item.Name;
      
    });
    return name;
  }

  getItemTotalPrice(ItemID) {
    if (this.ItemsData == undefined) return;
    let price: number;
    this.ItemsData.forEach(item => {
      if (item.ID == ItemID) price = item.Price;
      
    });
    this.quantityInput.setValue(this.OrderData.Quantity)
    return price * this.OrderData.Quantity;
  }
  getItemPrice(ItemID) {
    if (this.ItemsData == undefined) return;
    let price: number;
    this.ItemsData.forEach(item => {
      if (item.ID == ItemID) price = item.Price;
      
    });
    return price ;
  }
  increment() {
    let x = this.quantityInput.value + 1;
    this.quantityInput.setValue(x);
    this.OrderData.Quantity = x;
    let OrderID = this.OrderData.OrderID;
    let ItemID = this.OrderData.ItemID;
    let Quantity = x;
    let defrence = this.getItemPrice(this.OrderData.ItemID);
    let obj = {
      OrderID: OrderID,
      ItemID: ItemID,
      Quantity: Quantity,
      defrence : defrence
    }
    this.orderserves.updateQuantity(obj).subscribe();

  }
  decrement() {
    let x = this.quantityInput.value - 1;
    let flag = false;
    if (x <= 0) { x = 1; flag = true;}
    this.quantityInput.setValue(x);
    this.OrderData.Quantity = x;
    let OrderID = this.OrderData.OrderID;
    let ItemID = this.OrderData.ItemID;
    let Quantity = x;
    let defrence = -this.getItemPrice(this.OrderData.ItemID);
    if (flag) defrence = 0;
    let obj = {
      OrderID: OrderID,
      ItemID: ItemID,
      Quantity: Quantity,
      defrence : defrence
    }
    this.orderserves.updateQuantity(obj).subscribe();
  }

}
