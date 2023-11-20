import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, IonModal } from '@ionic/angular';
import { CalendarMode, CalendarComponent } from 'ionic6-calendar';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  eventList: any[] = [];

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };

  viewTitle = '';
  eventSource: any[] = [];
  @ViewChild(CalendarComponent) myCal!: CalendarComponent;
  @ViewChild('modal') modal!: IonModal;
  presentingElement: any = null;

  newEvent: any = {
    title: '',
    allDay: false,
    startTime: null,
    endTime: null,
  };
  showStart = false;
  showEnd = false;
  formattedStart = '';
  formattedEnd = '';

  constructor(
    private ionRouterOutlet: IonRouterOutlet,
    private storage: Storage, // Cambia el tipo a Storage,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.presentingElement = ionRouterOutlet.nativeEl;

    // Intenta inicializar Ionic Storage en el constructor
    
  }

  ngOnInit() {
    this.initStorage();
    this.showEventList();
  }

  async initStorage() {
    try {
      await this.storage.create();
      console.log('Ionic Storage inicializado correctamente.');
      this.showEventList();
      // Intenta obtener datos de la base de datos aquí para verificar si funciona
      const data = await this.storage.get('exampleKey');
      console.log('Data from storage:', data);
    } catch (error) {
      console.error('Error al inicializar Ionic Storage:', error);
    }
  }
  async showEventList() {
    
    this.eventList = await this.storage.get('events') || [];
    console.log('EventList cargado:', this.eventList);

    this.changeDetectorRef.detectChanges();
  }

  // Resto del código del componente

  setToday() {
    this.myCal.currentDate = new Date();
  }

  calendarBack() {
    this.myCal.slidePrev();
  }

  calendarForward() {
    this.myCal.slideNext();
  }

  onTimeSelected(ev: { selectedTime: Date; events: any }) {
    const selected = new Date(ev.selectedTime);

    if (this.calendar.mode === 'day' || this.calendar.mode === 'week') {
      this.modal.present();
    }
  }

  async sheduleEvent() {
    // Verifica si las fechas son válidas
    if (this.newEvent.startTime && this.newEvent.endTime) {
      // ... otras asignaciones
      const newEventCopy = { ...this.newEvent };
      this.eventSource.push(newEventCopy);

      // Guarda los eventos en el almacenamiento
      await this.saveEventsToStorage();

    

    // Muestra el evento en la pantalla
    this.showEventList();



      //this.modal.dismiss();
    } else {
      console.error("Seleccione fechas válidas para el evento.");
    }
  }

  // Método para guardar eventos en el almacenamiento
  async saveEventsToStorage() {
    try {
      // Intenta obtener la referencia a la base de datos
      const existingEvents = await this.storage.get('events') || [];
      // Agrega el nuevo evento a la lista existente
      existingEvents.push(this.newEvent);

      // Guarda la lista actualizada de eventos en el almacenamiento
      await this.storage.set('events', existingEvents);

      console.log('Eventos guardados en el almacenamiento:', existingEvents);
    } catch (error) {
      console.error('Error al guardar eventos en el almacenamiento:', error);
    }
  }


  
}
