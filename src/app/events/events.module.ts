import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from '@ngx-progressbar/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';

import { EventService } from '../core/services/event.service';
import { TeacherService } from '../core/services/teacher.service';
import { UtilsService } from '../shared/services/utils.service';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventTypesComponent } from './event-types/event-types.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EventDetailComponent } from './add-event/event-detail/event-detail.component';



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

    EventsRoutingModule
   
    ],
     providers:[EventService, TeacherService],
     declarations:[EventsComponent, EventTypesComponent, AddEventComponent, EventDetailComponent]

     })
export class EventsModule { }