import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedBlockComponent } from './featured-block.component';

describe('FeaturedBlockComponent', () => {
  let component: FeaturedBlockComponent;
  let fixture: ComponentFixture<FeaturedBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
