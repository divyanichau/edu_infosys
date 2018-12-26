import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { AcademicYearComponent } from './academic-year/academic-year.component';

@NgModule({
  declarations: [AcademicYearComponent],
  imports: [
    CommonModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
