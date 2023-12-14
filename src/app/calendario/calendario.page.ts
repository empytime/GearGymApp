// src/app/calendario/calendario.page.ts

import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg, DateSelectArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { FirebaseEventService } from '../services/../firebase-event.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  calendarOptions!: CalendarOptions;
  events: EventInput[] = [];

  constructor(private firebaseEventService: FirebaseEventService) {}

  ngOnInit() {
    this.initializeCalendar();
    this.loadEvents();
  }

  initializeCalendar() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      eventClick: this.handleEventClick.bind(this),
      select: this.handleDateSelect.bind(this),
      events: this.events,
    };
  }

  handleEventClick(arg: EventClickArg) {
    // Manejar clic en un evento si es necesario
    console.log('Event clicked:', arg);
  }

  handleDateSelect(arg: DateSelectArg) {
    const title = prompt('Ingrese el título del evento:');
    if (title) {
      const newEvent: EventInput = {
        title: title,
        start: arg.startStr,
        end: arg.endStr,
        allDay: arg.allDay,
      };

      this.firebaseEventService.addEvent(newEvent).then(() => {
        this.loadEvents();
      });
    }
  }

  loadEvents() {
    this.firebaseEventService.getEvents().subscribe(
      (events) => {
        this.events = events;
        this.calendarOptions.events = this.events;
      },
      (error) => {
        console.error('Error al cargar eventos:', error);
      }
    );
  }
}
