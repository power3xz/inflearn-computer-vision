import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Digit Classifier', url: 'classifier', icon: 'text' },
    { title: 'Object Detection', url: 'detection', icon: 'car' },
    { title: 'Gesture Recognition', url: 'recognition', icon: 'thumbs-up' },
    { title: 'Body Segmentation', url: 'body-segmentation', icon: 'body' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
