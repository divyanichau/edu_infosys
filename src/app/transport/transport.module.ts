import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';

@NgModule({
  declarations: [AddVehicleComponent],
  imports: [
    CommonModule,
    TransportRoutingModule
  ]
})
export class TransportModule { }
