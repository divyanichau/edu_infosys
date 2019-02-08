import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UtilsService } from '../../shared/services/utils.service';
import { SubjectService } from '../../core/services/subject.service';
import { CourseService } from '../../core/services/course.service';
import { BatchService } from '../../core/services/batch.service';
import { StudentService } from '../../core/services/student.service';
import { TeacherService } from '../../core/services/teacher.service';
import { SubjectAllocationService } from '../../core/services/subject-allocation.service';

import { SubjectRoutingModule } from './subject-routing.module';

import { SubjectComponent } from './subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { AssignSubjectComponent } from './assign-subject/assign-subject.component';
import { SubjectAllocationComponent } from './subject-allocation/subject-allocation.component';
import { SubjectDetailComponent } from './add-subject/subject-detail/subject-detail.component';
import { SubjectAllocationDetailComponent } from './subject-allocation/subject-allocation-detail/subject-allocation-detail.component';
import { AssignSubjectDetailComponent } from './assign-subject/assign-subject-detail/assign-subject-detail.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    NgxDatatableModule,

    SubjectRoutingModule
  ],
  providers: [SubjectService, CourseService, BatchService, StudentService, TeacherService, SubjectAllocationService, UtilsService],
  declarations: [SubjectComponent, AddSubjectComponent, AssignSubjectComponent, SubjectAllocationComponent, SubjectDetailComponent, SubjectAllocationDetailComponent, AssignSubjectDetailComponent]
})
export class SubjectModule { }