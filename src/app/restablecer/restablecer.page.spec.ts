import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestablecerPage } from './restablecer.page';
import { ToastController } from '@ionic/angular';
import { AuthEmailService } from '../services/auth-email.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { IonicModule } from '@ionic/angular';  // Importar IonicModule

// Mock de los servicios
class MockAuthEmailService {
  sendPasswordResetEmail(email: string) {
    return Promise.resolve();  // Simulamos un envío exitoso
  }
}

class MockToastController {
  create() {
    return Promise.resolve({
      present: () => {}  // Simulamos el método present
    });
  }
}

class MockRouter {
  navigate() {
    return Promise.resolve(); // Simula la navegación
  }
}

describe('RestablecerPage', () => {
  let component: RestablecerPage;
  let fixture: ComponentFixture<RestablecerPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestablecerPage],
      imports: [FormsModule, IonicModule],  // Importamos IonicModule y FormsModule
      providers: [
        { provide: ToastController, useClass: MockToastController },
        { provide: AuthEmailService, useClass: MockAuthEmailService },
        { provide: Router, useClass: MockRouter },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RestablecerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show toast if email is empty', async () => {
    const showToastSpy = spyOn(component, 'showToast');  // Espiamos la función showToast
    component.user.email = '';  // Simulamos que el correo está vacío
    
    await component.recuperarpassword();  // Llamamos al método de recuperar contraseña
    
    expect(showToastSpy).toHaveBeenCalledWith('Por favor, ingresa un correo electrónico válido.');
  });

  it('debería mostrar un mensaje emergente con el mensaje correcto', async () => {
    const toastCtrlSpy = spyOn(TestBed.inject(ToastController), 'create').and.callThrough();
    const testMessage = 'Mensaje de prueba';
  
    await component.showToast(testMessage);
  
    expect(toastCtrlSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        message: testMessage,
        duration: 3000,
        position: 'bottom',
      })
    );
  });
 

});
