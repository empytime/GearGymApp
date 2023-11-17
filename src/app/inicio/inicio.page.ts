import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  usuario: any;

  constructor(private menuCtrl: MenuController, private navCtrl: NavController) { }

  ngOnInit() {
    const usuarioJSON = localStorage.getItem('usuario');

    if (usuarioJSON !== null) {
      this.usuario = JSON.parse(usuarioJSON);
    }
  }

  eliminarElemento() {
    localStorage.removeItem('ingresado');
    console.log('Elemento eliminado del localStorage');
  }

  irAEjercicios() {
    this.navCtrl.navigateForward('ejercicios');
  }

  irARutinas() {
    this.navCtrl.navigateForward('rutinas');
  }

  irAExtras() {
    this.navCtrl.navigateForward('calendario');
  }

  irANutricion() {
    this.navCtrl.navigateForward('nutricion');
  }

  onClick() {
    this.menuCtrl.toggle();
  }
}





