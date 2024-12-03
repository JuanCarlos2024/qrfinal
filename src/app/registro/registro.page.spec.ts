import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { ToastController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPage],
      providers: [
        { provide: ToastController, useValue: { create: () => Promise.resolve({ present: () => {} }) } },
        { provide: AngularFireAuth, useValue: { createUserWithEmailAndPassword: () => Promise.resolve() } },
        { provide: NavController, useValue: { navigateRoot: () => Promise.resolve() } },
        { provide: Router, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Verificar la creación de componente', () => {
    expect(component).toBeTruthy();
  });

  it('Verificar que muestre un mensaje si el email esta vacío', async () => {
    const showToastSpy = spyOn(component, 'showToast');
    component.user = { email: '', password: 'testPassword' }; 
    
    await component.registro(component.user);  
    
    
    expect(showToastSpy).toHaveBeenCalledWith('Ingrese un email');
  });

  it('Verificar que muestre un mensaje si la contraseña esta vacía', async () => {
    const showToastSpy = spyOn(component, 'showToast');
    component.user = { email: 'test@example.com', password: '' }; 
    
    await component.registro(component.user);  
    
  
    expect(showToastSpy).toHaveBeenCalledWith('Ingrese una contraseña');
  });
});
