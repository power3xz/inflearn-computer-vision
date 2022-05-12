import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SegmentationPage } from './segmentation.page';

describe('SegmentationPage', () => {
  let component: SegmentationPage;
  let fixture: ComponentFixture<SegmentationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SegmentationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
