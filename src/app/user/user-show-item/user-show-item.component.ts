import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.module';
import { AuthService } from 'src/app/services/auth.service';
import { MembersService } from 'src/app/services/members.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-user-show-item',
  templateUrl: './user-show-item.component.html',
  styleUrls: ['./user-show-item.component.css']
})
export class UserShowItemComponent implements OnInit {
  @Input('s') itemInfo: Item
  quantityInput = new FormControl(1);

  descr = new FormControl('اكتب اللون والكمية لكل لون في حال كنت تريد اكثر من لون او اتركها فارغة اذا كان هناك لون واحد');

  constructor(private authservice:AuthService,private memberservice:MembersService,private orderserves:OrdersService,private route: Router) { }
  UserID: number;
  added = false;
  ngOnInit(): void {
    this.authservice.userstate().subscribe(x => {
      if (x != "user") {
        this.route.navigateByUrl('/home');
      }
    });
    let cookies: string = this.authservice.getCookie('name');
    
    this.memberservice.getUserID(cookies).subscribe(x => this.UserID = x);
  }

  increment() {
    let x = this.quantityInput.value + 1;
    this.quantityInput.setValue(x);
    

  }
  decrement() {
    let x = this.quantityInput.value - 1;
    let flag = false;
    if (x <= 0) { x = 1}
    this.quantityInput.setValue(x);
   
  }
  textAreaClick() {
    if (this.descr.value == 'اكتب اللون والكمية لكل لون في حال كنت تريد اكثر من لون او اتركها فارغة اذا كان هناك لون واحد') {
      this.descr.setValue("")
    }


  }
  addToCart() {
    let Quantity = this.quantityInput.value;
    let Descr = this.descr.value;
    let ItemID = this.itemInfo.ID;
    if (Descr == 'اكتب اللون والكمية لكل لون في حال كنت تريد اكثر من لون او اتركها فارغة اذا كان هناك لون واحد') {
      Descr = "";
    }
    let obj = {
      UserID: this.UserID,
      ItemID: ItemID,
      Quantity: Quantity,
      Descr:Descr
    }
    let obj2 = {
      UserID: this.UserID,
      ItemID: ItemID,
    }
    this.orderserves.checkCart(obj2).subscribe(x => {

      if (x.toString().length == 0) {
        this.orderserves.addToCart(obj).subscribe();
        this.added = true;
      }
      else {
        alert("العنصر موجود مسبقا في السلة لا يمكن اضافته مرتين")
        this.added = true;
      }
    })

  }
}
