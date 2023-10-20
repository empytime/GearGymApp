import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ejercicios',
  templateUrl: 'ejercicios.page.html',
  styleUrls: ['ejercicios.page.scss']
})
export class EjerciciosPage {
  constructor(private navCtrl: NavController) {}

  irAVideos(categoria: string) {
    // Aquí puedes navegar a la página de videos de YouTube y pasar la categoría como parámetro si es necesario
    this.navCtrl.navigateForward(`/videos/${categoria}`);
  }
}