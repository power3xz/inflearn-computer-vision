import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegmentationPageRoutingModule } from './segmentation-routing.module';

import { SegmentationPage } from './segmentation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SegmentationPageRoutingModule
  ],
  declarations: [SegmentationPage]
})
export class SegmentationPageModule {}
