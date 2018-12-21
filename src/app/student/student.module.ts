import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SectionService } from '../core/services/section.service';
import { ClassService } from '../core/services/class.service';
import { StudentService } from '../core/services/student.service';
import { CourseService } from '../core/services/course.service';
import { UtilsService } from '../shared/services/utils.service';


import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { AddComponent} from './add/add.component';
import { ListComponent} from './list/list.component';
import { DetailComponent} from './detail/detail.component';
import { IdcardComponent} from './idcard/idcard.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    NgxDatatableModule,

    StudentRoutingModule
  ],
  providers: [CourseService, StudentService, ClassService, SectionService, UtilsService],
  declarations: [StudentComponent, AddComponent, ListComponent, DetailComponent, IdcardComponent]
})
export class StudentModule { }