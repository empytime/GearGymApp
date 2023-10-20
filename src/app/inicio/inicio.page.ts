import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { InicioPageModule } from './inicio.module';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  usuario: any;

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



  constructor(private menuCtrl: MenuController)
    private (navCtrl: NavController) { }
  irAEjercicios() {
    // Navegar a la página de ejercicios
    this.navCtrl.navigateForward('ejercicios');
  }

  irARutinas() {
    // Navegar a la página de rutinas
    this.navCtrl.navigateForward('rutinas');
  }
  irAExtras() {
    // Navegar a la página de extras
    this.navCtrl.navigateForward('/');
  }

  irANutricion() {
    // Navegar a la página de nutrición
    this.navCtrl.navigateForward('calendario');
  }

  constructor(private menuCtrl: MenuController,
    private navCtrl: NavController) { }
  irAEjercicios() {
    // Navegar a la página de ejercicios
    this.navCtrl.navigateForward('ejercicios');
  }

  irARutinas() {
    // Navegar a la página de rutinas
    this.navCtrl.navigateForward('rutinas');
  }
  irAExtras() {
    // Navegar a la página de extras
    this.navCtrl.navigateForward('extras');
  }

  irANutricion() {
    // Navegar a la página de nutrición
    this.navCtrl.navigateForward('nutricion');
  }

  onClick() {
    this.menuCtrl.toggle();
  }

}





