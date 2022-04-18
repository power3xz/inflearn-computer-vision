import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
} from '@angular/core';

import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { DetectedObject } from '@tensorflow-models/coco-ssd';
import { initializeApp } from 'firebase/app';

import { getDatabase, update, ref, child } from 'firebase/database';

const firebaseConfig = {};

const app = initializeApp(firebaseConfig);

@Component({
  selector: 'app-detection',
  templateUrl: './detection.page.html',
  styleUrls: ['./detection.page.scss'],
})
export class DetectionPage implements OnInit {
  @ViewChild('videoRef', { static: false })
  videoRef: ElementRef<HTMLVideoElement>;
  @ViewChild('svgRef', { static: false }) svgRef: ElementRef<SVGElement>;

  currentDetections: DetectedObject[];
  model: cocoSsd.ObjectDetection;

  previousNumber = 0;
  videoBoundingRect;
  svgEnabled = true;
  numberOfObject;

  constructor(private cdRef: ChangeDetectorRef) {}

  async ngOnInit() {
    this.model = await cocoSsd.load({ base: 'lite_mobilenet_v2' });
    await this.detectFrame();
    await this.videoRef.nativeElement.play();
  }

  async onVideoCanPlay() {
    this.videoBoundingRect =
      this.videoRef.nativeElement.getBoundingClientRect();
  }

  async detectFrame() {
    if (this.model) {
      this.currentDetections = await this.model.detect(
        this.videoRef.nativeElement
      );
      this.numberOfObject = this.currentDetections.length;
      if (this.numberOfObject === this.previousNumber) {
      } else {
        const db = getDatabase(
          app,
          'https://mobile-dnn-6e76e-default-rtdb.firebaseio.com/'
        );

        this.previousNumber = this.numberOfObject;
        const timestamp = new Date().getTime();
        update(child(ref(db, 'parking'), 'west-coast'), {
          count: this.numberOfObject,
          time: timestamp,
        });
      }
      this.cdRef.markForCheck();
      requestAnimationFrame(async () => {
        await this.detectFrame();
      });
    }
  }

  toggleSvgOverlay() {
    this.svgEnabled = !this.svgEnabled;
  }
}
