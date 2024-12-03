import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  
  it('Verificar que el componente se crea correctamente', () => {
    expect(component).toBeTruthy();
  });

  
  it('Verificar que el HTML contiene el elemento <ion-router-outlet>', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ion-router-outlet')).not.toBeNull();
  });

  
  it('Verificar que el HTML contiene el elemento raíz con el selector app-root', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ion-app')).not.toBeNull();
  });
});