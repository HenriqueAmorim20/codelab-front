import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioConsultaComponent } from './usuario-consulta.component';

describe('UsuarioConsultaComponent', () => {
  let component: UsuarioConsultaComponent;
  let fixture: ComponentFixture<UsuarioConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioConsultaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
