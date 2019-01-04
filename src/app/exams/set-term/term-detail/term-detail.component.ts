import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray, isObject } from 'lodash';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { UtilsService } from '../../../shared/services/utils.service';
import { SetTermService } from '../../../core/services/set-term.service';
import { BatchService } from '../../../core/services/batch.service';

import { setTerm } from '../../../core/classes/exam/set-term';
import { Batch } from '../../../core/classes/batch'

@Component({
  selector: 'app-term-detail',
  templateUrl: './term-detail.component.html',
  styleUrls: []
})
export class TermDetailComponent implements OnInit {
  private _sub: Subscription = undefined;
  totlTerm:setTerm[];
  _term:setTerm=new setTerm();
  obj:Batch[];
  selected_batch:number
  id:string;

  constructor(
    private _routes:ActivatedRoute,
   private _utils:UtilsService,
   private _setTermService:SetTermService,
   private _batchService:BatchService,
   private _router:Router
  ) { }

  ngOnInit() {
    this.initTerm();
  }

  // loadExamTerm() {
  //   this._utils.unsubscribeSub(this._sub);
  //   this._sub = this._setTermService.get().subscribe(
  //     data => {
  //       isArray(data) ? this.totlTerm = data : data;
  //      console.log("Terms",this.totlTerm);
  //      this.loadBatch();
       

  //     }
  //   );
  // }

  initTerm() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._routes.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this._setTermService.find(this.id);
      }))
      .subscribe(data => {
        if (isObject(data)) {
          this._term = data;
       //   console.log("Batch",this._term.batch);
        }
        this.loadBatch();
      });

  }

  loadBatch() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._batchService.get().subscribe(
      data => {
        isArray(data) ? this.obj = data : data;
        //console.log(this.obj);
        //this.selected_batch=this._term.batch_id;
       //console.log(this.selected_batch);
       

      }
    );
  }

  OnSubmitTermUpdate(){
  // console.log(this.id)
   // console.log(this.route);
   this._term.batch=this.selected_batch;
  console.log("Datta To Be Updated",this._term);
  
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._setTermService.update(this._term,this.id)
      .subscribe(data => {
         //console.log("Updated Data",data);
        // alert('student Updated');
       this._router.navigate(['/exam/set_term']);
      });
 }
   
 
  
}
