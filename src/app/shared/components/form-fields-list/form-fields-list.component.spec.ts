import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldsListComponent } from './form-fields-list.component';

describe('FormFieldsListComponent', () => {
  let component: FormFieldsListComponent;
  let fixture: ComponentFixture<FormFieldsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
