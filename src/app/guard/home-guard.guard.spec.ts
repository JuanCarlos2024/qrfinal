import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { homeGuardGuard } from './home-guard.guard';
import { AuthService } from '../servicios/auth-service.service';

describe('homeGuardGuard', () => {
  let guard: homeGuardGuard;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    // Crear mocks para los servicios
    authServiceMock = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(of(true)), // Simula que el usuario está autenticado
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'), // Espía las llamadas a router.navigate
    };

    TestBed.configureTestingModule({
      providers: [
        homeGuardGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    guard = TestBed.inject(homeGuardGuard); // Obtén una instancia del guard desde TestBed
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if authenticated', (done) => {
    authServiceMock.isAuthenticated.and.returnValue(of(true)); // Simula que el usuario está autenticado

    guard.canActivate().subscribe((result) => {
      expect(result).toBeTrue(); // El guard debería permitir la activación
      done();
    });
  });

  it('should redirect to /acceso if not authenticated', (done) => {
    authServiceMock.isAuthenticated.and.returnValue(of(false)); // Simula que el usuario NO está autenticado

    guard.canActivate().subscribe((result) => {
      expect(result).toBeFalse(); // El guard no debería permitir la activación
      expect(routerMock.navigate).toHaveBeenCalledWith(['/acceso']); // Verifica la redirección
      done();
    });
  });
});
