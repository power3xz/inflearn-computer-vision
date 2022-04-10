import { Component, ViewChild, OnInit } from '@angular/core';
import { DrawableDirective } from '../drawable.directive';

import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-classifier',
  templateUrl: './classifier.page.html',
  styleUrls: ['./classifier.page.scss'],
})
export class ClassifierPage implements OnInit {
  @ViewChild(DrawableDirective, { static: false }) canvas;

  predictText = 'Please draw a digit';

  model: tf.LayersModel;
  predictions: any;

  constructor() {}
  ngOnInit() {
    this.loadModel();
  }

  async loadModel() {
    this.model = await tf.loadLayersModel('../assets/model.json');
  }

  async predict(imageData: ImageData) {
    const pred = await tf.tidy(() => {
      const startTime = new Date();
      let img = tf.browser.fromPixels(imageData, 1);
      img = img.reshape([1, 28, 28]);
      img = tf.cast(img, 'float32');

      const output = this.model.predict(img) as any;
      console.log(output);
      console.log(output.argMax(0));

      this.predictions = Array.from(output.dataSync());
      const maxIndex = this.argMax(this.predictions);
      const endTime = new Date();
      const timeDiff = endTime.valueOf() - startTime.valueOf();

      this.predictText = `Prediction Result: ${maxIndex.toString()}
  Confidence: ${this.predictions[maxIndex].toString()}
  Elapsed: ${timeDiff.toString()}ms
  `;
    });
  }

  argMax(array) {
    return array
      .map((x, i) => [x, i])
      .reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  }

  clear() {
    this.predictText = 'Please draw a digit';
  }
}
