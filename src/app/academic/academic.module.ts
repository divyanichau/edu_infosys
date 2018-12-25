import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { SectionService } from '../core/services/section.service';
//import { ClassService } from '../core/services/class.service';
import { TimetableService } from '../core/services/timetable.service';
//import { AcademicService } from '../core/services/academic.service';
import { UtilsService } from '../shared/services/utils.service';


import { AcademicRoutingModule } from './academic-routing.module';
import { AcademicComponent } from './academic.component';
import { TimetableComponent} from './timetable/timetable.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    NgxDatatableModule,

    AcademicRoutingModule
  ],
  providers: [TimetableService , UtilsService],
  declarations: [AcademicComponent,TimetableComponent]

})
export class AcademicModule { }