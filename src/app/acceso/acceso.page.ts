import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user.model';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.page.html',
  styleUrls: ['./acceso.page.scss'],
})
export class AccesoPage implements OnInit {
  user = {} as User; 
 
  constructor(
    private router: Router,
    private storage: Storage,
    private toastCtrl: ToastController,
    private aFauth: AngularFireAuth,
    private navCtrl: NavController) {}
    

  async ngOnInit() {

    await this.storage.create();
    this.datos();
  }
  async acceso(user: User) {
    if (this.formValidation()) {
      this.showToast("Espere un momento por favor...");
  
      try {
        await this.aFauth.signInWithEmailAndPassword(user.email, user.password).then(async data => {
          console.log(data);
  
          // Obtén el nombre de usuario del Storage
          const userName = await this.storage.get(user.email);
  
          if (userName) {
            let navigationExtras: NavigationExtras = {
              state: {
                userName: userName
              }
            };
  
            // Redirige a la página adecuada según el correo
            if (user.email === "van.arias@duocuc.cl") {
              this.navCtrl.navigateRoot("home", navigationExtras);
            } else if (user.email === "ju.reyesm@duocuc.cl") {
              this.navCtrl.navigateRoot("profesor", navigationExtras);
            } else {
              this.showToast("No se encontró una página asignada a este usuario");
            }
          } else {
            this.showToast("No se encontró un nombre de usuario asociado a este correo");
          }
        });
      } catch (e: any) {
        let errorMessage = e.message || e.getLocalizedMessage();
        this.showToast("Usuario no registrado: " + errorMessage);
      }
    }
  }
  

formValidation() {
  if (!this.user.email) {
    this.showToast("Ingrese un email");
    return false;
  }

  if (!this.user.password) {
    this.showToast("Ingrese una contraseña");
    return false;
  }

  return true;
}

showToast(message: string) {
  this.toastCtrl.create({
    message: message,
    duration: 5000
  }).then(toastData => toastData.present());
}


  restablecer(){   
    this.router.navigate(['/restablecer']);
  }

  registro(){
    this.router.navigate(['/registro']);

    }

    datos() {
      this.storage.set("ju.reyesm@duocuc.cl", "Juan Reyes");
      this.storage.set("van.arias@duocuc.cl", "Vanessa Arias");
    
      console.log("Nombres registrados en Storage asociados a correos");
    }

  

}
