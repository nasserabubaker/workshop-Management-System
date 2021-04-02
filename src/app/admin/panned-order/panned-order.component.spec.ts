import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannedOrderComponent } from './panned-order.component';

describe('PannedOrderComponent', () => {
  let component: PannedOrderComponent;
  let fixture: ComponentFixture<PannedOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PannedOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PannedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
