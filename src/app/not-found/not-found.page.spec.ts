import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundPage } from './not-found.page';
import { By } from '@angular/platform-browser';

describe('NotFoundPage', () => {
  let component: NotFoundPage;
  let fixture: ComponentFixture<NotFoundPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('Verificar que el componente se crea correctamente', () => {
    expect(component).toBeTruthy();
  });
 
  
  it('Verificar que el mensaje de error "Error 404" esté visible', () => {
    const errorElement = fixture.debugElement.query(By.css('h2')); 
    expect(errorElement.nativeElement.textContent).toBe('Error 404'); 
  });

  
  it(' Verificar que el botón "Volver al inicio" esté presente', () => {
    const buttonElement = fixture.debugElement.query(By.css('ion-button')); 
    expect(buttonElement.nativeElement.textContent).toContain('Volver al inicio'); 
  });
});
