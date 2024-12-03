import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorPage } from './profesor.page'; 
import { IonicModule } from '@ionic/angular';
import { MatRadioModule } from '@angular/material/radio';
import { QRCodeModule } from 'angularx-qrcode';
import { Storage } from '@ionic/storage-angular';
import { of } from 'rxjs';


class MockStorage {
  get() {
    return Promise.resolve('Juan Reyes'); 
  }
}

describe('ProfesorPage', () => {
  let component: ProfesorPage;
  let fixture: ComponentFixture<ProfesorPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(), 
        MatRadioModule, 
        QRCodeModule,
        ProfesorPage
      ],
      providers: [
        { provide: Storage, useClass: MockStorage }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  
  it('Verificar que el componente se crea correctamente', () => {
    expect(component).toBeTruthy();
  });

  
  it(' Verificar que el nombre del usuario se muestra correctamente', async () => {
   
    await fixture.whenStable();
    fixture.detectChanges();

    const userNameElement = fixture.nativeElement.querySelector('ion-item p');
    expect(userNameElement.textContent).toContain('Juan Reyes'); 
  });

  
  it('Verificar que el contenido del QR es correcto', async () => {
    
    const qrCodeElement = fixture.nativeElement.querySelector('qrcode');
    expect(qrCodeElement).toBeTruthy();
    
    expect(component.qrCodeString).toBe('Felicidades, has quedado presente');
  });
});
