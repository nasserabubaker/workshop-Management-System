import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminitemsComponent } from './adminitems.component';

describe('AdminitemsComponent', () => {
  let component: AdminitemsComponent;
  let fixture: ComponentFixture<AdminitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminitemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
