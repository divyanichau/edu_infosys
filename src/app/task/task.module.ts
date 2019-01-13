import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TaskService} from '../core/services/task.service';
import { StudentService} from '../core/services/student.service';
import { CourseService } from '../core/services/course.service';
import { BatchService } from '../core/services/batch.service';
import { UtilsService } from '../shared/services/utils.service';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { Student } from '../core/classes/student';
import { Course } from '../core/classes/course';
import { Batch } from '../core/classes/batch';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    NgxDatatableModule,

    TaskRoutingModule
  ],
  providers: [ TaskService, StudentService , CourseService, BatchService, UtilsService],
  declarations: [TaskComponent, AssignTaskComponent, TaskDetailComponent]
})
export class TaskModule {}