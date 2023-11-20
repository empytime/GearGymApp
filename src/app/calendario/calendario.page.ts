import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, IonModal } from '@ionic/angular';
import { CalendarMode, CalendarComponent } from 'ionic6-calendar';
import { Storage } from '@ionic/storage-angular';
import { QrService } from '../services/qr-service.service';

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
  calendarioService: any;

  constructor(
    private ionRouterOutlet: IonRouterOutlet,
    private storage: Storage,
    private changeDetectorRef: ChangeDetectorRef,
    private qrService: QrService
  ) {
    this.presentingElement = ionRouterOutlet.nativeEl;
    this.qrService.getQrCodeObservable().subscribe((qrCode: any) => {
      this.agregarEventoCalendario(qrCode);
    });
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

  agregarEventoCalendario(qrCode: any) {
    // Supongamos que qrCode contiene una fecha en formato de texto como "22/11/2023"
    const fechaTexto = qrCode.text;

    // Parsea la fecha de texto a un objeto Date
    const fecha = this.parsearFechaTexto(fechaTexto);

    // Asume que tienes un servicio llamado calendarioService
    // que maneja la lógica del calendario
    this.calendarioService.agregarEvento({
      title: 'Evento desde QR',
      allDay: true, // Evento de todo el día
      startTime: fecha,
      endTime: fecha,
    });

    // También podrías agregar el evento a tu lista local si es necesario
    this.eventSource.push({
      title: 'Evento desde QR',
      allDay: true,
      startTime: fecha,
      endTime: fecha,
    });

    // Guarda los eventos en el almacenamiento
    this.saveEventsToStorage();

    // Actualiza la lista de eventos mostrada en la pantalla
    this.showEventList();
  }

  // Función para parsear la fecha de texto a un objeto Date
  parsearFechaTexto(fechaTexto: string): Date {
    const partesFecha = fechaTexto.split('/');
    const dia = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10) - 1; // Meses en JavaScript son de 0 a 11
    const anio = parseInt(partesFecha[2], 10);

    return new Date(anio, mes, dia);
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
    if (this.newEvent.startTime && this.newEvent.endTime) {
      const newEventCopy = { ...this.newEvent };
      this.eventSource.push(newEventCopy);
      await this.saveEventsToStorage();
      this.showEventList();
    } else {
      console.error("Seleccione fechas válidas para el evento.");
    }
  }

  // Método para guardar eventos en el almacenamiento
  
  async saveEventsToStorage(): Promise<void> {
  try {
    // Obtén los eventos existentes del almacenamiento
    const existingEvents = await this.storage.get('events') || [];
  
    // Agrega el último evento creado desde el código QR
    const latestEvent = this.eventSource[this.eventSource.length - 1];
    existingEvents.push(latestEvent);
  
    // Guarda la lista actualizada de eventos en el almacenamiento
    await this.storage.set('events', existingEvents);
  
    console.log('Eventos guardados en el almacenamiento:', existingEvents);
  } catch (error) {
    console.error('Error al guardar eventos en el almacenamiento:', error);
  }
}
  
}
