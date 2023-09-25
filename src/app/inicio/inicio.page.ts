import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { InicioPageModule } from './inicio.module';  

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

    constructor(private menuCtrl: MenuController) {}

    onClick()
    {
      this.menuCtrl.toggle();
    }
  
}


