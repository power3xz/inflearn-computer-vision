import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
} from '@angular/core';

import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { DetectedObject } from '@tensorflow-models/coco-ssd';

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
