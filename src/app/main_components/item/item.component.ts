import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.module';
declare var $: any;

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  
  @Input('s') ItemInfo: Item;
  constructor() { }

  ngOnInit(): void {
 
  }
   increaseValue() {

    var value = parseInt((<HTMLInputElement>document.getElementById('number')).value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    (<HTMLInputElement>document.getElementById('number')).value = value.toString();
  }
  
   decreaseValue() {
    var value = parseInt((<HTMLInputElement>document.getElementById('number')).value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    (<HTMLInputElement>document.getElementById('number')).value = value.toString();
  }

}
