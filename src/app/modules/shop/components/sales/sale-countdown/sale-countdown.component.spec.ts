import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCountdownComponent } from './sale-countdown.component';

describe('SaleCountdownComponent', () => {
  let component: SaleCountdownComponent;
  let fixture: ComponentFixture<SaleCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleCountdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
