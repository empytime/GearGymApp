import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { FirebaseService } from '../services/login-register/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router, 
    private firebaseService: FirebaseService
  ) {
    this.formularioLogin = this.fb.group({
      'nombreUser': ['', [Validators.required]],
      'passwordUser': ['', [Validators.required]],
    });
  }

  async ingresar() {
    try {
      const { nombreUser, passwordUser } = this.formularioLogin.value;

      
      if (this.formularioLogin.invalid) {
        const alert = await this.alertController.create({
          header: 'Datos incompletos o inválidos',
          message: 'Verifica los campos del formulario.',
          buttons: ['Aceptar'],
        });

        await alert.present();
        return;
      }

      
      this.firebaseService.login({ email: nombreUser, password: passwordUser })
        .then(() => {
          
          console.log('Inicio de sesión exitoso');

          
          this.router.navigate(['inicio']); 
        })
        .catch(async error => {
          
          const alert = await this.alertController.create({
            header: 'Error de inicio de sesión',
            message: 'Los datos ingresados no son válidos. Verifica tu correo electrónico y contraseña.',
            buttons: ['Aceptar'],
          });

          await alert.present();
        });
    } catch (error) {
      console.error('Error inesperado al iniciar sesión:', error);
    }
  }
}
