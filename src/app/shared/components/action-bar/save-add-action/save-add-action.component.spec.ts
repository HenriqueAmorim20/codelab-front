import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveAddActionComponent } from './save-add-action.component';

describe('SaveAddActionComponent', () => {
  let component: SaveAddActionComponent;
  let fixture: ComponentFixture<SaveAddActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveAddActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveAddActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
