import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QrService {
  private qrCodeSubject = new Subject<string>();


  emitQrCode(code: string) {
    this.qrCodeSubject.next(code);
  }

  
  getQrCodeObservable() {
    return this.qrCodeSubject.asObservable();
  }
}