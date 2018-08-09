import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripFormPage } from './trip-form';

@NgModule({
  declarations: [
    TripFormPage,
  ],
  imports: [
    IonicPageModule.forChild(TripFormPage),
  ],
  exports:[TripFormPage]
})
export class TripFormPageModule {}
