import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SettingRoutingModule } from './setting-routing.module';
import { AcademicYearComponent } from './academic-year/academic-year.component';
import { InstitutionalDetailComponent } from './institutional-detail/institutional-detail.component';
import { SettingService } from './../core/services/setting.service'

@NgModule({
  declarations: [AcademicYearComponent, InstitutionalDetailComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule
  ],
  providers :[SettingService]
})
export class SettingModule { }
