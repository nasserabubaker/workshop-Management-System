import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShowItemComponent } from './user-show-item.component';

describe('UserShowItemComponent', () => {
  let component: UserShowItemComponent;
  let fixture: ComponentFixture<UserShowItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserShowItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
