import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-panned-order',
  templateUrl: './panned-order.component.html',
  styleUrls: ['./panned-order.component.css']
})
export class PannedOrderComponent implements OnInit {

  constructor( private route:ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
  }

}
