import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

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
    public navCtrl: NavController
  ) {
    this.formularioLogin = this.fb.group({
      nombreUser: ["", Validators.required],
      passwordUser: ["", Validators.required],
    });
  }

  async ingresar() {
    const nombreUsuario = this.formularioLogin.value.nombreUser;
    const contrasena = this.formularioLogin.value.passwordUser;
  
    
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      const usuario = JSON.parse(usuarioString);
      
      
      if (usuario.nombre === nombreUsuario && usuario.password === contrasena) {
        console.log("Ingresado");
        localStorage.setItem("ingresado", "true");
        this.navCtrl.navigateRoot("inicio");
      } else {
        const alert = await this.alertController.create({
          header: "Datos incorrectos",
          message: "Los datos ingresados no son válidos",
          buttons: ["Aceptar"],
        });
    
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: "Usuario no registrado",
        message: "Debes registrarte primero",
        buttons: ["Aceptar"],
      });
  
      await alert.present();
    }
  }
}
