import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment.prod'; // Importa la configuración de Firebase
import { of } from 'rxjs';

// Mock de AngularFireAuth
class MockAngularFireAuth {
  authState = of(null);  // Por defecto, no hay usuario autenticado (simulado como null)
  
  // Si quieres simular un usuario autenticado
  setAuthState(user: any) {
    this.authState = of(user);
  }
}

describe('AuthService', () => {
  let service: AuthService;
  let afAuthMock: MockAngularFireAuth;

  beforeEach(() => {
    afAuthMock = new MockAngularFireAuth();

    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: afAuthMock }, // Usamos el mock de AngularFireAuth
        { provide: 'angularfire2.app.options', useValue: environment } // Usamos las configuraciones de Firebase
      ]
    });
    service = TestBed.inject(AuthService);  // Inyectamos el servicio a probar
  });

  it('Verificamos que el servicio se haya creado correctamente', () => {
    expect(service).toBeTruthy();  
  });

  it('Debería retornar verdadero si el usuario esta autenticado', (done) => {
    
    afAuthMock.setAuthState({ uid: '12345' });

    service.isAuthenticated().subscribe(isAuthenticated => {
      expect(isAuthenticated).toBe(true);
      done();
    });
  });

  it('Debería retornar falso si el usuario no esta autenticado', (done) => {
    
    afAuthMock.setAuthState(null);

    service.isAuthenticated().subscribe(isAuthenticated => {
      expect(isAuthenticated).toBe(false);
      done();
    });
  });
});
