import { Component, OnInit,AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


import { UtilsService } from '../../shared/services/utils.service';
import { SettingService } from '../../core/services/setting.service';

import { SettingMixin } from '../../core/mixins/setting.mixin';

import { AcademicYear } from '../../core/classes/academic_year';

@Component({
  selector: 'app-academic-year',
  templateUrl: './academic-year.component.html',
  styleUrls: ['./academic-year.component.css']
})
export class AcademicYearComponent extends SettingMixin implements OnInit  {

  academic_year : AcademicYear = new AcademicYear();

  constructor(
    private router: Router,
     _utils: UtilsService,
     _settingService: SettingService,
    
    ) {
      super(_utils,_settingService);

     }

  ngOnInit() {
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._settingService.addAcademicYear(this.academic_year)
      .subscribe(data => {

      });
  }

}
