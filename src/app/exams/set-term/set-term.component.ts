import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
//import { Router } from '@angular/router';
import { isArray } from 'lodash';

//import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../shared/services/utils.service';

import { BatchService } from '../../core/services/batch.service';

import { Batch } from '../../core/classes/batch'

@Component({
  selector: 'app-set-term',
  templateUrl: './set-term.component.html',
  styleUrls: ['./set-term.component.css']
})
export class SetTermComponent implements OnInit {
  private _sub: Subscription = undefined;

  obj : Batch[];
  _batch:[];

  constructor(
    private _utils:UtilsService,
    private _batchService:BatchService,

  ) { }

  ngOnInit() {
    this.loadBatch();
  }
  loadBatch() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._batchService.get().subscribe(
      data => {
        isArray(data) ? this.obj = data : data;
        console.log(this.obj);
       //  this.loadCourse();

      }
    );
  }
}
