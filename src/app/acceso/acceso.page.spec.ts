import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccesoPage } from './acceso.page';
import { ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

// Mock de los servicios
class MockStorage {
  create() {
    return Promise.resolve();
  }
  set() {
    return Promise.resolve();
  }
  get() {
    return Promise.resolve('MockUserName'); 
  }
}

class MockToastController {
  create() {
    return Promise.resolve({
      present: () => {} 
    });
  }
}

class MockAngularFireAuth {
  signInWithEmailAndPassword() {
    return Promise.resolve({ user: { email: 'van.arias@duocuc.cl' } });
  }
}

class MockNavController {
  navigateRoot() {
    return Promise.resolve(); 
  }
}

describe('AccesoPage', () => {
  let component: AccesoPage;
  let fixture: ComponentFixture<AccesoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccesoPage],
      providers: [
        { provide: ToastController, useClass: MockToastController },
        { provide: Storage, useClass: MockStorage },
        { provide: AngularFireAuth, useClass: MockAngularFireAuth },
        { provide: NavController, useClass: MockNavController }, 
        { provide: Router, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccesoPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  
  it('Verificar que el componente se crea correctamente', () => {
    expect(component).toBeTruthy();
  });

  
  it('Verificar que el formulario no se valida cuando el email está vacío', () => {
    component.user.email = ''; 
    component.user.password = '123'; 

    const isValid = component.formValidation(); 

    expect(isValid).toBeFalse(); // Espera que la validación falle
  });

  
  it('Verificar que el formulario no se valida cuando la contraseña está vacía', () => {
    component.user.email = 'van.arias@duocuc.cl'; 
    component.user.password = ''; 

    const isValid = component.formValidation(); 

    expect(isValid).toBeFalse(); // Espera que la validación falle
  });

});

