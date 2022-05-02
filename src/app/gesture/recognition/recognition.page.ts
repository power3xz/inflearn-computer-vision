/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as tmImage from '@teachablemachine/image';

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.page.html',
  styleUrls: ['./recognition.page.scss'],
})
export class RecognitionPage implements OnInit {
  @ViewChild('videoRef', { static: false }) videoRef: ElementRef;

  url = 'https://teachablemachine.withgoogle.com/models/dfLBa2dtw/';
  model;
  predictions;
  webcam;
  maxPredictions;
  label: string;
  map: { [key in string]: string } = {
    Rock: '바위',
    Scissors: '가위',
    Paper: '보',
  };

  constructor() {}

  async ngOnInit() {
    const modelURL = this.url + 'model.json';
    const metadataURL = this.url + 'metadata.json';
    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();

    const flip = true;
    this.webcam = new tmImage.Webcam(200, 200, flip);
    await this.webcam.setup();
    await this.webcam.play();
    requestAnimationFrame(() => {
      this.loop();
    });
    this.videoRef.nativeElement.appendChild(this.webcam.canvas);
  }

  async loop() {
    this.webcam.update();
    this.predictions = await this.model.predict(this.webcam.canvas, true);
    this.label =
      this.map[
        Array.from<{ className: string }>(this.predictions).sort(
          (a: any, b: any) => b.probability - a.probability
        )[0].className
      ];
    requestAnimationFrame(() => {
      this.loop();
    });
  }
}
