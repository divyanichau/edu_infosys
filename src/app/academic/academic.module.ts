import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AcademicRoutingModule } from './academic-routing.module';
import { TimetableService } from '../core/services/timetable.service';
import { UtilsService } from '../shared/services/utils.service';
import { AcademicComponent } from './academic.component';
import { CreateComponent } from './certification/create/create.component';
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
  declarations: [CreateComponent, AcademicComponent,TimetableComponent]

})


export class AcademicModule { }
