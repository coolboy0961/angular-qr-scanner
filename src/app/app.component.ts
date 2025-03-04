import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  qrResultString: string = '';
  scannerEnabled: boolean = true;
  cameraCount: number = 0; // カメラデバイスの数を保持するプロパティ

  ngOnInit() {
    this.getCameraCount(); // コンポーネント初期化時にカメラ数を確認
  }

  // カメラデバイスの数を取得するメソッド
  async getCameraCount() {
    try {
      // 利用可能なメディアデバイスを取得
      const devices = await navigator.mediaDevices.enumerateDevices();
      // ビデオ入力デバイス（カメラ）のみをフィルタリング
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      this.cameraCount = videoDevices.length; // カメラの数をセット
      console.log('利用可能なカメラデバイス:', videoDevices);
    } catch (error) {
      console.error('カメラデバイスの取得に失敗しました:', error);
      this.cameraCount = 0; // エラー時は0をセット
    }
  }

  onScanSuccess(result: string) {
    this.qrResultString = result;
    this.scannerEnabled = false; // スキャン後にカメラをオフにする
  }

  restartScanner() {
    this.scannerEnabled = true;
    this.qrResultString = '';
    this.getCameraCount(); // 再スキャン時にカメラ数を再確認（必要に応じて）
  }
}
