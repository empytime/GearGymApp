import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,
          Validators,
          FormBuilder } from "@angular/forms";
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;
  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) { 
      this.formularioRegistro = this.fb.group({
        'nombreRegistro': ['', [Validators.required, Validators.minLength(5)]],
        'passwordRegistro': ['', [Validators.required, Validators.minLength(8)]], 
        'confirmacionPasswordR': ['', [Validators.required, Validators.minLength(8)]]
      });
  }
  
  ngOnInit() {
    
  }
  async guardar(){
    
    var f = this.formularioRegistro.value;
    console.log("ingresado")
    

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar'],
      });
      
      await alert.present();
      return;
    }
    var usuario = {
      nombre: f.nombreRegistro,
      password: f.passwordRegistro,
    }
    
    localStorage.setItem('usuario',JSON.stringify(usuario));
    localStorage.setItem('ingresado','true');
    this.navCtrl.navigateRoot('login');
    
  }
  
}
