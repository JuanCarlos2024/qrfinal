import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LogoutConfirmationDialogComponent } from './logout-confirmation-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

describe('LogoutConfirmationDialogComponent', () => {
  let component: LogoutConfirmationDialogComponent;
  let fixture: ComponentFixture<LogoutConfirmationDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), MatDialogModule, MatButtonModule, LogoutConfirmationDialogComponent], // Usar 'imports' en lugar de 'declarations'
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  
  it('Verificación de la creación del componente', () => {
    expect(component).toBeTruthy();
  });

  
  it('Prueba de que closeDialog cierra el diálogo con false', () => {
    const closeSpy = spyOn(component.dialogRef, 'close'); 

    component.closeDialog();

    expect(closeSpy).toHaveBeenCalledWith(false); 
  });

  
  it('Prueba de que confirmLogout cierra el diálogo con true', () => {
    const closeSpy = spyOn(component.dialogRef, 'close'); 

    component.confirmLogout(); 

    expect(closeSpy).toHaveBeenCalledWith(true); 
  });
});
