import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveActionComponent } from './save-action.component';

describe('SaveActionComponent', () => {
  let component: SaveActionComponent;
  let fixture: ComponentFixture<SaveActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
