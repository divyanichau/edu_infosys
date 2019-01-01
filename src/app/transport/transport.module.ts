import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';

import { UtilsService } from '../shared/services/utils.service';

import { TransportRoutingModule } from './transport-routing.module';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddRouteComponent } from './add-route/add-route.component';
import { AllocateTransportComponent } from './allocate-transport/allocate-transport.component';

import { DriverService } from '../core/services/driver.service';
import { VehicleService } from '../core/services/vehicle.service';
import { _RouteService } from '../core/services/_route.service';
import { BatchService } from '../core/services/batch.service';
import { CourseService } from '../core/services/course.service';
import { ClassService } from '../core/services/class.service';
import { SectionService } from '../core/services/section.service';
import { StudentService } from '../core/services/student.service';
import { AllocateTransportService } from '../core/services/allocate-transport.servie';
import { AllocateTransportEditComponent } from './allocate-transport/edit/allocate-transport-edit.component';
import { EditRouteComponent } from './edit-route/edit-route.component';

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
  providers: [UtilsService, DriverService,
     VehicleService,_RouteService,BatchService,CourseService,
     ClassService,SectionService,StudentService,AllocateTransportService],
  declarations: [AddVehicleComponent, AddRouteComponent, AllocateTransportComponent, AllocateTransportEditComponent, EditRouteComponent,]
})
export class TransportModule { }
