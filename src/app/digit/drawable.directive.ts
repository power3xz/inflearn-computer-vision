import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appDrawable]',
})
export class DrawableDirective implements OnInit {
  @Output() newImage = new EventEmitter();

  pos = { x: 0, y: 0 };
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  constructor(private el: ElementRef) {}

  @HostListener('mouseup', ['$event'])
  onUp(e) {
    this.newImage.emit(this.getImgData());
  }

  @HostListener('mouseenter', ['$event'])
  onEnter(e) {
    this.setPosition(e);
  }

  @HostListener('mousedown', ['$event'])
  onMove(e) {
    this.setPosition(e);
  }
  @HostListener('mousemove', ['$event'])
  onDown(e) {
    if (e.buttons !== 1) {
      return;
    }

    this.ctx.beginPath();

    this.ctx.lineWidth = 10;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#ffffff';

    this.ctx.moveTo(this.pos.x, this.pos.y);
    this.setPosition(e);
    this.ctx.lineTo(this.pos.x, this.pos.y);

    this.ctx.stroke();
  }

  @HostListener('resize', ['$event'])
  onResize(e) {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  ngOnInit(): void {
    this.canvas = this.el.nativeElement as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
  }

  getImgData(): ImageData {
    const scaled = this.ctx.drawImage(this.canvas, 0, 0, 28, 28);
    return this.ctx.getImageData(0, 0, 28, 28);
  }

  setPosition(e) {
    this.pos.x = e.offsetX;
    this.pos.y = e.offsetY;
  }
}
