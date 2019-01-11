import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UtilsService } from '../shared/services/utils.service';
import { SettingService } from '../core/services/setting.service';


import { SettingRoutingModule } from './setting-routing.module';
import { AcademicYearComponent } from './academic-year/academic-year.component';

@NgModule({
  declarations: [AcademicYearComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    SettingRoutingModule
  ],
  providers: [SettingService, UtilsService],

})
export class SettingModule { }
