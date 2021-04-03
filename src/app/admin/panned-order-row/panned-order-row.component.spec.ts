import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannedOrderRowComponent } from './panned-order-row.component';

describe('PannedOrderRowComponent', () => {
  let component: PannedOrderRowComponent;
  let fixture: ComponentFixture<PannedOrderRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PannedOrderRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PannedOrderRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
