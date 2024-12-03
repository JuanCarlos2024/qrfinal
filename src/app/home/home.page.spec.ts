import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { HomePage } from './home.page';
import { Storage } from '@ionic/storage-angular'; // Importa Storage
import { of } from 'rxjs'; // Importamos 'of' para crear un observable

// Mock de Storage
class MockStorage {
  get() {
    return Promise.resolve(null); // Simulamos que no hay nada guardado
  }
  set() {
    return Promise.resolve(); // Simulamos la operación de guardar sin error
  }
}

// Mock de ActivatedRoute
class MockActivatedRoute {
  queryParams = of({}); // Devolvemos un observable vacío, puedes modificarlo según tus necesidades
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { 
          provide: Router, 
          useValue: { getCurrentNavigation: () => ({ extras: { state: { userName: 'MockUser' } } }) } 
        },
        { 
          provide: ActivatedRoute, 
          useClass: MockActivatedRoute  // Usamos el mock de ActivatedRoute
        },
        { provide: Storage, useClass: MockStorage }, // Usamos el mock de Storage
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('Verificar que el componente se crea correctamente', () => {
    expect(component).toBeTruthy();
  });

  
  it('Verificar que la fecha se asigna correctamente en ngOnInit', () => {
    const fecha = new Date();
    const expectedDate = fecha.toLocaleDateString() + ' ' + fecha.toLocaleTimeString();

    component.ngOnInit();

    expect(component.fechaHoy).toBe(expectedDate);
  });

  
  it('Verificar que content_visibility se inicializa correctamente', () => {
    expect(component.content_visibility).toBe('show');
  });
});
