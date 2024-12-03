import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode'; // Asegúrate de que esté instalada y configurada
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
  standalone: true,
  imports: [
    MatRadioModule,
    CommonModule, // Para directivas básicas como *ngIf y *ngFor
    FormsModule,
    IonicModule, // Para componentes de Ionic como ion-header, ion-content, etc.
    QRCodeModule, // Para el componente <qrcode>
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permite usar componentes personalizados como Ionic y QRCode
})
export class ProfesorPage implements OnInit {
  qrCodeString = 'Felicidades, has quedado presente';
  userName: string = ''; // Variable para almacenar el nombre del usuario

  constructor(private storage: Storage) {}

  async ngOnInit() {
    // Recuperamos el nombre del usuario desde el Storage
    const email = 'ju.reyesm@duocuc.cl'; // Este es el correo del profesor, puedes hacerlo dinámico si es necesario
    const userName = await this.storage.get(email);
    
    // Si el nombre de usuario se encuentra en Storage, lo asignamos a la variable
    if (userName) {
      this.userName = userName;
    }
  }
}