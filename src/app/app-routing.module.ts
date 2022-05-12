import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'classifier',
    loadChildren: () =>
      import('./digit/classifier/classifier.module').then(
        (m) => m.ClassifierPageModule
      ),
  },
  {
    path: 'detection',
    loadChildren: () =>
      import('./object/detection/detection.module').then(
        (m) => m.DetectionPageModule
      ),
  },
  {
    path: 'recognition',
    loadChildren: () =>
      import('./gesture/recognition/recognition.module').then(
        (m) => m.RecognitionPageModule
      ),
  },
  {
    path: 'body-segmentation',
    loadChildren: () =>
      import('./body/segmentation/segmentation.module').then(
        (m) => m.SegmentationPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
