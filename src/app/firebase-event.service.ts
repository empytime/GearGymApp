// firebase-event.service.ts

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseEventService {
  constructor(private db: AngularFireDatabase) {}

  getEvents(): Observable<any[]> {
    // Obtener eventos desde la base de datos
    return this.db.list<any>('events').valueChanges();
  }

addEvent(event: any): Promise<void> {
    // Agregar el evento directamente a Firebase y devolver la promesa
    const eventsList: AngularFireList<any> = this.db.list('events');
    return eventsList.push(event).then(() => Promise.resolve());
}

updateEvent(eventId: string, updatedEvent: any): Promise<void> {
    // Actualizar un evento existente en la base de datos
    return this.db.object(`events/${eventId}`).update(updatedEvent).then(() => Promise.resolve());
}

deleteEvent(eventId: string): Promise<void> {
    // Eliminar un evento de la base de datos
    return this.db.object(`events/${eventId}`).remove().then(() => Promise.resolve());
}
}
