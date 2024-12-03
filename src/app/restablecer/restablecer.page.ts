import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthEmailService } from '../services/auth-email.service';
import { Router, NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage {
  user = { email: '' }; // Objeto para almacenar el correo del usuario

  constructor(private AuthEmailService: AuthEmailService, private toastCtrl: ToastController, private router: Router) {}

  async recuperarpassword() {
    if (!this.user.email) {
      this.showToast('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    try {
      await this.AuthEmailService.sendPasswordResetEmail(this.user.email);
      this.showToast('Se ha enviado un correo de restablecimiento.');
    } catch (error: any) {
      this.showToast('Error al enviar el correo: ' + error.message);
    }
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    }).then(toast => toast.present());
  }

  botonVolver() {
    // Opcional: Definir datos a enviar a la página 'acceso'
    const navigationExtras: NavigationExtras = {
      state: {
        message: 'Volviendo a la página de acceso',
        timestamp: Date.now()
      }
    };

    // Navegar a la página 'acceso'
    this.router.navigate(['acceso'], navigationExtras);
  }

}
