import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SectionService } from '../core/services/section.service';
import { ClassService } from '../core/services/class.service';
import { GuardianService } from '../core/services/guardian.service';
import { CourseService } from '../core/services/course.service';
import { UtilsService } from '../shared/services/utils.service';


import { GuardianRoutingModule } from './guardian-routing.module';
import { GuardianComponent } from './guardian.component';
import { AddComponent} from './add/add.component';
import { ListComponent} from './list/list.component';
//import { DetailComponent} from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    NgxDatatableModule,

    GuardianRoutingModule
  ],
  providers: [CourseService, GuardianService, ClassService, SectionService, UtilsService],
  declarations: [GuardianComponent, AddComponent, ListComponent]
})
export class GuardianModule { }