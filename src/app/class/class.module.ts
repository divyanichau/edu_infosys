import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from '@ngx-progressbar/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';

import { SectionService } from '../core/services/section.service';
import { BatchService } from '../core/services/batch.service';
import { CourseService } from '../core/services/course.service';
import { ClassService } from '../core/services/class.service';
import { TeacherService } from '../core/services/teacher.service';
import { TeacherAllocationService } from '../core/services/teacherallocation.service';
import { UtilsService } from '../shared/services/utils.service';

import { ClassRoutingModule } from './class-routing.module';
import { ClassComponent } from './class.component';
import { AddClassComponent} from './add-class/add-class.component';
import { AddSectionComponent} from './add-section/add-section.component';
import { AddCourseComponent} from './add-course/add-course.component';
import { AddBatchComponent} from './add-batch/add-batch.component';

import { TeacherAllocationComponent} from './teacher-allocation/teacher-allocation.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgxDatatableModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgProgressModule.withConfig({
      spinnerPosition: 'left',
      color: 'red'
    }),
    
    ClassRoutingModule
  ],
  providers: [ClassService, SectionService, TeacherService, CourseService, BatchService, TeacherAllocationService, UtilsService],
  declarations: [ClassComponent, AddClassComponent, AddSectionComponent, AddCourseComponent, AddBatchComponent, TeacherAllocationComponent]
})
export class ClassModule { }