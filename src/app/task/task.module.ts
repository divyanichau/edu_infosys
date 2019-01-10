import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';


import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TaskService} from '../core/services/task.service';
import { UtilsService } from '../shared/services/utils.service';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { AssignTaskComponent } from './assign-task/assign-task.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    NgxDatatableModule,

    TaskRoutingModule
  ],
  providers: [ TaskService,  UtilsService],
  declarations: [TaskComponent, AssignTaskComponent]
})
export class TaskModule { }