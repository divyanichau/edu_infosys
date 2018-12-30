import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';

import { TransportRoutingModule } from './transport-routing.module';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddRouteComponent } from './add-route/add-route.component';
import { AllocateTransportComponent } from './allocate-transport/allocate-transport.component';

import { DriverService } from '../core/services/driver.service';
import { UtilsService } from '../shared/services/utils.service';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    NgxDatatableModule,
    ToastrModule.forRoot(), // ToastrModule added

    TransportRoutingModule
  ],
  providers: [DriverService,UtilsService],
  declarations: [AddVehicleComponent, AddRouteComponent, AllocateTransportComponent]
})
export class TransportModule { }
