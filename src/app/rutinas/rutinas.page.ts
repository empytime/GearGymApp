import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.page.html',
  styleUrls: ['./rutinas.page.scss'],
})
export class RutinasPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  volverAInicio() {
    this.navCtrl.navigateBack('/inicio');
  }

}
