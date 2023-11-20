import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss']
})
export class CalculadoraPage {
  peso: number = 0;
  altura: number = 0;
  resultado: number = 0;
  clasificacion: string = '';

  constructor() {}

  calcularImc() {
    if (this.altura <= 0) {
      
      console.error('La altura debe ser mayor que cero.');
      return;
    }

    
    const imc = this.peso / (this.altura * this.altura);

    
    this.resultado = Math.round(imc * 100) / 100;

    
    if (imc < 18.5) {
      this.clasificacion = 'Bajo peso';
    } else if (imc < 24.9) {
      this.clasificacion = 'Peso normal';
    } else if (imc < 29.9) {
      this.clasificacion = 'Sobrepeso';
    } else if (imc < 34.9) {
      this.clasificacion = 'Obesidad Clase I';
    } else if (imc < 39.9) {
      this.clasificacion = 'Obesidad Clase II';
    } else {
      this.clasificacion = 'Obesidad Clase III';
    }
  }
}
