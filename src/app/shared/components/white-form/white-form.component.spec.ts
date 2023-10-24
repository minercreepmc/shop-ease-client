import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteFormComponent } from './white-form.component';

describe('WhiteFormComponent', () => {
  let component: WhiteFormComponent;
  let fixture: ComponentFixture<WhiteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhiteFormComponent]
    });
    fixture = TestBed.createComponent(WhiteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
