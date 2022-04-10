import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassifierPage } from './classifier.page';

const routes: Routes = [
  {
    path: '',
    component: ClassifierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassifierPageRoutingModule {}
