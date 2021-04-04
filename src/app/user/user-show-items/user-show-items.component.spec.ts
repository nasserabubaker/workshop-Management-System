import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShowItemsComponent } from './user-show-items.component';

describe('UserShowItemsComponent', () => {
  let component: UserShowItemsComponent;
  let fixture: ComponentFixture<UserShowItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserShowItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShowItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
