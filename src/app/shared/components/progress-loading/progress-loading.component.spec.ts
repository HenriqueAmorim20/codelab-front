import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressLoadingComponent } from './progress-loading.component';

describe('ProgressLoadingComponent', () => {
  let component: ProgressLoadingComponent;
  let fixture: ComponentFixture<ProgressLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressLoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
