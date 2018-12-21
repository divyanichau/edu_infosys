import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SectionService } from '../core/services/section.service';
import { ClassService } from '../core/services/class.service';
import { BatchService } from '../core/services/batch.service';
import { UtilsService } from '../shared/services/utils.service';

import { ClassRoutingModule } from './class-routing.module';
import { ClassComponent } from './class.component';
import { AddClassComponent} from './add-class/add-class.component';
import { AddSectionComponent} from './add-section/add-section.component';
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
  providers: [ClassService, SectionService, BatchService, UtilsService],
  declarations: [ClassComponent, AddClassComponent, AddSectionComponent, AddBatchComponent]
})
export class ClassModule { }