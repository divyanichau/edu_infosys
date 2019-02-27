import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';


import { NgProgressModule } from 'ngx-progressbar';
import { ToastrModule } from 'ngx-toastr';

import { UtilsService } from '../shared/services/utils.service';
import { DashboardService } from '../core/services/dashboard.service';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { EventService } from '../core/services/event.service';
import { TeacherService } from '../core/services/teacher.service';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    ToastrModule.forRoot(), // ToastrModule added


    DashboardRoutingModule
  ],
   providers:[EventService, TeacherService],

  declarations: [DashboardComponent]


})
export class DashboardModule { }