import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassifierPageRoutingModule } from './classifier-routing.module';

import { ClassifierPage } from './classifier.page';
import { DrawableDirective } from '../drawable.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassifierPageRoutingModule,
  ],
  declarations: [ClassifierPage, DrawableDirective],
})
export class ClassifierPageModule {}
