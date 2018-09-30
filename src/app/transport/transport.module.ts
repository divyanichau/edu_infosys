import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SectionService } from '../core/services/section.service';
import { ClassService } from '../core/services/class.service';
import { TransportService } from '../core/services/transport.service';
import { CourseService } from '../core/services/course.service';
import { UtilsService } from '../shared/services/utils.service';


import { TransportRoutingModule } from './transport-routing.module';
import { TransportComponent } from './transport.component';
import { AddComponent} from './add/add.component';
import { ListComponent} from './list/list.component';
import { DetailComponent} from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    NgxDatatableModule,

    TransportRoutingModule
  ],
  providers: [CourseService, TransportService, ClassService, SectionService, UtilsService],
  declarations: [TransportComponent, AddComponent, ListComponent, DetailComponent]
})
export class TransportModule { }