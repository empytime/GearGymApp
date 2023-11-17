import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { AlertController, NavController } from '@ionic/angular';
import { FirebaseService } from '../services/login-register/firebase.service'; // Reemplaza 'path-to-your-firebase-service' con la ruta correcta

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private firebaseService: FirebaseService
  ) {
    this.formularioRegistro = this.fb.group({
      'nombreRegistro': ['', [Validators.required, Validators.minLength(5)]],
      'passwordRegistro': ['', [Validators.required, Validators.minLength(8)]],
      'confirmacionPasswordR': ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {}

  async guardar() {
    try {
      var f = this.formularioRegistro.value;
      console.log("ingresado");
  
      if (this.formularioRegistro.invalid) {
        const alert = await this.alertController.create({
          header: 'Datos incompletos',
          message: 'Tienes que llenar todos los datos',
          buttons: ['Aceptar'],
        });
  
        await alert.present();
        return;
      }

    // Llama al método de registro en tu servicio de Firebase
    this.firebaseService.register({ email: f.nombreRegistro, password: f.passwordRegistro })
      .then((userCredential: { user: any; }) => {
        // Registro exitoso
        console.log('Usuario registrado con éxito:', userCredential.user);

        // Redirige al usuario a la página de inicio de sesión
        this.navCtrl.navigateRoot('login');
      })
    } catch (error) {
      console.error('Error inesperado al guardar:', error);
    }
  }
}
