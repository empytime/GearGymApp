import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QrService {
  private qrCodeSubject = new Subject<string>();

  // emitir el código QR escaneado
  emitQrCode(code: string) {
    this.qrCodeSubject.next(code);
  }

  // Observable 
  getQrCodeObservable() {
    return this.qrCodeSubject.asObservable();
  }
}