import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SectionService } from '../core/services/section.service';
import { BatchService } from '../core/services/batch.service';
import { CourseService } from '../core/services/course.service';
import { ClassService } from '../core/services/class.service';
//import { TeacherAllocationService } from '../core/services/teacher-allocation.service';
import { UtilsService } from '../shared/services/utils.service';

import { ClassRoutingModule } from './class-routing.module';
import { ClassComponent } from './class.component';
import { AddClassComponent} from './add-class/add-class.component';
import { AddSectionComponent} from './add-section/add-section.component';
import { AddCourseComponent} from './add-course/add-course.component';
import { AddBatchComponent} from './add-batch/add-batch.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    NgxDatatableModule,

    ClassRoutingModule
  ],
  providers: [ClassService, SectionService, CourseService, BatchService, UtilsService],
  declarations: [ClassComponent, AddClassComponent, AddSectionComponent,  AddCourseComponent, AddBatchComponent]
})
export class ClassModule { }