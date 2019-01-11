import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from '@ngx-progressbar/core';

import { NgxTypeaheadModule } from 'ngx-typeahead';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';

import { SectionService } from '../core/services/section.service';
import { ClassService } from '../core/services/class.service';
import { StudentService } from '../core/services/student.service';
import { CourseService } from '../core/services/course.service';
import { BatchService } from '../core/services/batch.service';
import { UtilsService } from '../shared/services/utils.service';



import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { AddComponent} from './add/add.component';
import { ListComponent} from './list/list.component';
import { IdcardComponent} from './idcard/idcard.component';
import { ViewDetailComponent } from './view-detail/view-detail.component';
import { DetailComponent } from './detail/detail.component';
//import { AttendenceComponent } from './attendence/attendence.component';


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
    NgxTypeaheadModule,

    StudentRoutingModule
  ],
  providers: [CourseService, BatchService, StudentService, ClassService, SectionService, UtilsService],

  declarations: [StudentComponent,DetailComponent, AddComponent, ListComponent, ViewDetailComponent, IdcardComponent]


})
export class StudentModule { }