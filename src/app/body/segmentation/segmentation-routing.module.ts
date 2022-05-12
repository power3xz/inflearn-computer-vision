import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegmentationPage } from './segmentation.page';

const routes: Routes = [
  {
    path: '',
    component: SegmentationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegmentationPageRoutingModule {}
