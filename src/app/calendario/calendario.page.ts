import { Component, OnInit,ViewChild} from '@angular/core';
import { CalendarMode,CalendarComponent } from 'ionic6-calendar';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {



  calendar ={
    mode:'month' as CalendarMode,
    currentDate: new Date(),
  }
  viewTitle='';
  eventSource: any[]= [];
  @ViewChild(CalendarComponent) myCal!: CalendarComponent;

  constructor() { }

  ngOnInit() {
  }

  setToday(){
    this.myCal.currentDate = new Date();

  }
  calendarBack(){
    this.myCal.slidePrev();
  }
  calendarForward(){
    this.myCal.slideNext();
  }
}
