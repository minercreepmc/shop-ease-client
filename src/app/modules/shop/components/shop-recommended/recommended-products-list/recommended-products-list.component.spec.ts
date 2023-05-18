import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedProductsListComponent } from './recommended-products-list.component';

describe('RecommendedProductsListComponent', () => {
  let component: RecommendedProductsListComponent;
  let fixture: ComponentFixture<RecommendedProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedProductsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
