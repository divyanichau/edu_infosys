import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { isArray, isObject } from 'lodash';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../shared/services/utils.service';

import { SettingService } from '../../core/services/setting.service';

declare var numeral: any
@Component({
  selector: 'app-institute-detail',
  templateUrl: './institute-detail.component.html',
  styleUrls: []
})
export class InstituteDetailComponent implements OnInit, OnDestroy {
   private _sub: Subscription = undefined;
   private _typeSub: Subscription = undefined;

obj = [];

  constructor(
  	private _settingService: SettingService,
    private _utils: UtilsService,
     private _routes:ActivatedRoute,
    private _router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
  }

   ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    //console.log(this.obj);
    // this._sub = this._settingService.add(this.obj)
    //   .subscribe(data => {
    //     console.log(data);
    //      this.toastr.success('Class Added !', 'Success',{timeOut: 3000});
    //   });
  }

}