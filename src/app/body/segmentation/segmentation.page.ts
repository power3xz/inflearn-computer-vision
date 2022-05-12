import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as bodyPix from '@tensorflow-models/body-pix';

@Component({
  selector: 'app-segmentation',
  templateUrl: './segmentation.page.html',
  styleUrls: ['./segmentation.page.scss'],
})
export class SegmentationPage implements OnInit {
  @ViewChild('video', { static: false }) videoElement: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('output', { static: false }) output: ElementRef;

  videoWidth: number = 0;
  videoHeight: number = 0;
  constraints = {
    video: {
        facingMode: "environment",
        width: { ideal: 480 },
        height: { ideal: 480 }
    }
  };
  model: any;
  visualization: string = "toMask";
  isReady: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.model = {
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 2
    };
    //this.startCamera();
  }

  async startCamera() {
     if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
         navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
         this.isReady = true;
     } else {
         alert('Sorry, camera not available.');
     }
  }

  changeCamera(event: any) {
    this.constraints = {
      video: {
          facingMode: event.target.value,
          width: { ideal: 480 },
          height: { ideal: 480 }
      }
    };
    //this.startCamera();
  }

  changeModel(event: any) {
    if (event.target.value == "mobilenet") {
      this.model = {
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2
      };
    } else {
      this.model = {
        architecture: 'ResNet50',
        outputStride: 32,
        quantBytes: 2
      };
    };
  }

  changeVisualization(event: any) {
    this.visualization = event.target.value;
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
        this.videoHeight = this.videoElement.nativeElement.videoHeight;
        this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }

  async capture() {
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    const net = await bodyPix.load(this.model);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0)

    switch(this.visualization) { 
      case "toMask": { 
        const segmentation = await net.segmentPerson(this.canvas.nativeElement);

        // The mask image is an binary mask image with a 1 where there is a person and
        // a 0 where there is not.
        const coloredPartImage = bodyPix.toMask(segmentation);
        const opacity = 0.7;
        const flipHorizontal = false;
        const maskBlurAmount = 0;

        bodyPix.drawMask(
          this.output.nativeElement, this.canvas.nativeElement, coloredPartImage, opacity, maskBlurAmount,
          flipHorizontal);
        break; 
      } 
      case "toColoredPartMask": { 
        const segmentation = await net.segmentMultiPersonParts(this.canvas.nativeElement);

        // The mask image is an binary mask image with a 1 where there is a person and
        // a 0 where there is not.
        const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
        const opacity = 0.7;
        const flipHorizontal = false;
        const maskBlurAmount = 0;

        bodyPix.drawMask(
          this.output.nativeElement, this.canvas.nativeElement, coloredPartImage, opacity, maskBlurAmount,
          flipHorizontal);

        break; 
      } 
      case "drawMask": { 
        const segmentation = await net.segmentPerson(this.canvas.nativeElement);

        // Convert the segmentation into a mask to darken the background.
        const foregroundColor = {r: 0, g: 0, b: 0, a: 0};
        const backgroundColor = {r: 0, g: 0, b: 0, a: 255};
        const coloredPartImage = bodyPix.toMask(
          segmentation, foregroundColor, backgroundColor);
          const opacity = 0.7;
          const flipHorizontal = false;
          const maskBlurAmount = 3;

        bodyPix.drawMask(
          this.output.nativeElement, this.canvas.nativeElement, coloredPartImage, opacity, maskBlurAmount,
          flipHorizontal);
        break; 
      } 
      case "drawPixelatedMask": { 
        const segmentation = await net.segmentPersonParts(this.canvas.nativeElement);

        // The mask image is an binary mask image with a 1 where there is a person and
        // a 0 where there is not.
        const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
        const opacity = 0.7;
        const flipHorizontal = false;
        const maskBlurAmount = 3;
        const pixelCellWidth = 10.0;

        bodyPix.drawPixelatedMask(
          this.output.nativeElement, this.canvas.nativeElement, coloredPartImage, opacity, maskBlurAmount,
          flipHorizontal, pixelCellWidth);

        break; 
      } 
      case "drawBokehEffect": { 
        const segmentation = await net.segmentPerson(this.canvas.nativeElement);

        const backgroundBlurAmount = 3;
        const edgeBlurAmount = 3;
        const flipHorizontal = false;

        bodyPix.drawBokehEffect(
          this.output.nativeElement, this.canvas.nativeElement, segmentation, backgroundBlurAmount,
          edgeBlurAmount, flipHorizontal);

        break; 
      } 
      case "blurBodyPart": { 
        const segmentation = await net.segmentMultiPersonParts(this.canvas.nativeElement);

        const backgroundBlurAmount = 3;
        const edgeBlurAmount = 3;
        const flipHorizontal = false;
        const faceBodyPartIdsToBlur = [0, 1];

        bodyPix.blurBodyPart(
          this.output.nativeElement, this.canvas.nativeElement, segmentation, faceBodyPartIdsToBlur,
          backgroundBlurAmount, edgeBlurAmount, flipHorizontal);

        break; 
      } 
      default: { 
        const segmentation = await net.segmentPerson(this.canvas.nativeElement);

        // The mask image is an binary mask image with a 1 where there is a person and
        // a 0 where there is not.
        const coloredPartImage = bodyPix.toMask(segmentation);
        const opacity = 0.7;
        const flipHorizontal = false;
        const maskBlurAmount = 0;

        bodyPix.drawMask(
          this.output.nativeElement, this.canvas.nativeElement, coloredPartImage, opacity, maskBlurAmount,
          flipHorizontal);
        break; 
      } 
    } 

  }
  handleError(error) {
    console.log('Error: ', error);
    alert('Error: '+ error);
  }
}
