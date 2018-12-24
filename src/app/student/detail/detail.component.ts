import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { isArray, isObject } from 'lodash';

import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/classes/student';
import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-list',
  templateUrl: './detail.component.html',
  styleUrls: []
})
  
export class DetailComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  student : Student = new Student();

  constructor(
    private _routes: ActivatedRoute,
    private _studentService: StudentService,
    private _utils: UtilsService,
    private router: Router
    ) {}

  ngOnInit() {
    this.initStudent();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }


  initStudent() {

    // this._utils.unsubscribeSub(this._sub);
    // this._sub = this._studentService.find(this.router.snapshot.paramMap.get('id')).subscribe(
    //   data => {
    //     isArray(data) ? this.student = data : data;
       

    //   }
    // );


    this._utils.unsubscribeSub(this._sub);
    this._sub =  this._routes.paramMap
      .switchMap((params: ParamMap) => {
        return this._studentService.find(params.get('id'));
      })
      .subscribe(data => {
        if (isObject(data)) {
          this.student = data;
          console.log(this.student);
        }
      });
  }




 
}
