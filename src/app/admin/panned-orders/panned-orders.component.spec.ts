import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannedOrdersComponent } from './panned-orders.component';

describe('PannedOrdersComponent', () => {
  let component: PannedOrdersComponent;
  let fixture: ComponentFixture<PannedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PannedOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PannedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
