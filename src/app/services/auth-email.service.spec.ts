import { TestBed } from '@angular/core/testing';
import { AuthEmailService } from './auth-email.service';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { of, throwError } from 'rxjs';  // Importamos para simular respuestas

describe('AuthEmailService', () => {
  let service: AuthEmailService;
  let afAuthSpy: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(() => {
    // Creamos un espía (mock) para AngularFireAuth
    const spy = jasmine.createSpyObj('AngularFireAuth', ['sendPasswordResetEmail']);

    TestBed.configureTestingModule({
      providers: [
        AuthEmailService,
        { provide: AngularFireAuth, useValue: spy }  // Usamos el mock de AngularFireAuth
      ]
    });
    service = TestBed.inject(AuthEmailService);  // Inyectamos el servicio
    afAuthSpy = TestBed.inject(AngularFireAuth) as jasmine.SpyObj<AngularFireAuth>;  // Obtenemos el espía
  });

  it('Verificar la creación de componente', () => {
    // Verifica que el servicio se haya creado correctamente
    expect(service).toBeTruthy();
  });

  it('debería llamar a sendPasswordResetEmail en AngularFireAuth', async () => {
    const email = 'test@domain.com';

    // Simulamos una respuesta exitosa
    afAuthSpy.sendPasswordResetEmail.and.returnValue(Promise.resolve());

    // Llamamos al método del servicio
    await service.sendPasswordResetEmail(email);

    // Verificamos que el método de AngularFireAuth haya sido llamado con el correo correcto
    expect(afAuthSpy.sendPasswordResetEmail).toHaveBeenCalledWith(email);
  });

  it('manejar error cuando el envio de correo en recuperar contraseña falla', async () => {
    const email = 'test@domain.com';
    const errorResponse = new Error('Error al enviar el correo');

    // Simulamos que se produce un error
    afAuthSpy.sendPasswordResetEmail.and.returnValue(Promise.reject(errorResponse));

    try {
      // Llamamos al método del servicio
      await service.sendPasswordResetEmail(email);
    } catch (error) {
      // Verificamos que el error se haya manejado correctamente
      expect(error).toBe(errorResponse);
    }

    // Aseguramos que se haya llamado al método de AngularFireAuth
    expect(afAuthSpy.sendPasswordResetEmail).toHaveBeenCalledWith(email);
  });
});
