import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; // Importa MatButtonModule
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule

@Component({
  selector: 'app-logout-confirmation-dialog',
  templateUrl: './logout-confirmation-dialog.component.html',
  styleUrls: ['./logout-confirmation-dialog.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule], // Asegúrate de incluir ambos módulos aquí
})
export class LogoutConfirmationDialogComponent {
  readonly dialogRef = inject(MatDialogRef<LogoutConfirmationDialogComponent>);

  closeDialog(): void {
    this.dialogRef.close(false); // Cierra el diálogo y pasa false
  }

  confirmLogout(): void {
    this.dialogRef.close(true); // Cierra el diálogo y pasa true
  }
}