import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackActionComponent } from './back-action.component';

describe('BackActionComponent', () => {
  let component: BackActionComponent;
  let fixture: ComponentFixture<BackActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BackActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
