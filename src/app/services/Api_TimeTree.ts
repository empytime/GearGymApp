import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TimeTreeService {
  private clientId = 'TU_CLIENT_ID';
  private clientSecret = 'TU_CLIENT_SECRET';
  private accessToken = ''; // Aquí almacenarás el token de acceso

  // Método para obtener el token de acceso
  getAccessToken() {
    const data = {
      grant_type: 'authorization_code',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: 'http://localhost/callback', // Cambia esto a tu URL de redirección
      code: 'TU_CODIGO_DE_AUTORIZACIÓN', // Reemplaza con tu código de autorización
    };

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    return axios.post('https://timetreeapp.com/oauth/token', data, config);
  }

  // Método para obtener eventos
  getEvents() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    };

    return axios.get('https://timetreeapp.com/calendars/TU_CALENDAR_ID/events', config);
  }
}