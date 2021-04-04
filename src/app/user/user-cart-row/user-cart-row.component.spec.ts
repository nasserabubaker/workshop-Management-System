import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCartRowComponent } from './user-cart-row.component';

describe('UserCartRowComponent', () => {
  let component: UserCartRowComponent;
  let fixture: ComponentFixture<UserCartRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCartRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCartRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
