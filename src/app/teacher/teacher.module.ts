import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';


import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SectionService } from '../core/services/section.service';
import { ClassService } from '../core/services/class.service';
import { TeacherService} from '../core/services/teacher.service';
import { CourseService } from '../core/services/course.service';
import { UtilsService } from '../shared/services/utils.service';


import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { DetailComponent  }  from './detail/detail.component';
import { IdcardComponent} from './idcard/idcard.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    NgxDatatableModule,

    TeacherRoutingModule
  ],
  providers: [CourseService,  TeacherService, ClassService, SectionService,  UtilsService],
  declarations: [TeacherComponent,  AddComponent,ListComponent, DetailComponent, IdcardComponent
   ]
})
export class TeacherModule { }