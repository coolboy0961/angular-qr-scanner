import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  qrResultString: string = '';
  scannerEnabled: boolean = true;

  onScanSuccess(result: string) {
    this.qrResultString = result;
    this.scannerEnabled = false; // スキャン後にカメラをオフにする
  }

  restartScanner() {
    this.scannerEnabled = true;
    this.qrResultString = '';
  }
}
