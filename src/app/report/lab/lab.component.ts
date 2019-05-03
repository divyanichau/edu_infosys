import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { LabService } from '../../core/services/lab.service';
import { Lab } from '../../core/classes/lab';
import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
  
export class LabComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  lab : Lab;
  // courses: Course[];


  constructor(
    private _labService: LabService,
    // private _courseService: CourseService,
    private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService
    ) { }


  ngOnInit() {
    this.initLab();
    // this.loadCourses();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._labService.add(this.lab)
      .subscribe(data => {
        console.log(data);
        this.toastr.success('Lab Report Submitted!', 'Success',{timeOut: 3000});

      });
  }

  // loadCourses() {
  //   this._utils.unsubscribeSub(this._sub);
  //   this._sub = this._courseService.get().subscribe(
  //     data => {
  //       isArray(data) ? this.courses = data : data;
  //       console.log(this.courses);

  //     }
  //   );
  // }

  initLab() {
    this._utils.unsubscribeSub(this._typeSub);
    this.lab = new Lab();
    
  }

 
}
