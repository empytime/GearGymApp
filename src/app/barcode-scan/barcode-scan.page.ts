import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-barcode-scan',
  templateUrl: './barcode-scan.page.html',
  styleUrls: ['./barcode-scan.page.scss'],
})
export class BarcodeScanPage implements OnInit {
  code: any;

  constructor(private barcodeScanner: BarcodeScanner) {}

  ngOnInit() {}

  async scan() {
    const result = await this.barcodeScanner.scan();
    this.code = result.text;
    console.log('Barcode data', this.code);
  }
}
