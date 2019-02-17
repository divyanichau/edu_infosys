import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { UtilsService } from '../shared/services/utils.service';
//import { SettingComponent } from './setting.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingService } from '../core/services/setting.service';
import { AcademicYearComponent } from './academic-year/academic-year.component';
import { InstituteDetailComponent } from './institute-detail/institute-detail.component';

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgxDatatableModule,
    NgxTypeaheadModule,
    
    SettingRoutingModule
  ],
    providers: [SettingService, UtilsService],
    declarations: [ AcademicYearComponent, InstituteDetailComponent]

})
export class SettingModule { }
