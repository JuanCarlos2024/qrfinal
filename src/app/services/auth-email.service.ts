
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthEmailService {
  static sendPasswordResetEmail: any;
  constructor(private afAuth: AngularFireAuth) {}

  async sendPasswordResetEmail(email: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      console.log('Correo de restablecimiento enviado');
    } catch (error) {
      console.error('Error al enviar el correo de restablecimiento', error);
      throw error;
    }
  }
}

