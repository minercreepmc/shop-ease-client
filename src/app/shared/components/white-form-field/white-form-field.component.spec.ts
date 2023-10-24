import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteFormFieldComponent } from './white-form-field.component';

describe('WhiteFormFieldComponent', () => {
  let component: WhiteFormFieldComponent;
  let fixture: ComponentFixture<WhiteFormFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhiteFormFieldComponent]
    });
    fixture = TestBed.createComponent(WhiteFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
