import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import { CourseService } from '../../core/services/course.service';
import { GuardianService } from '../../core/services/guardian.service';
import { Guardian } from '../../core/classes/guardian';
import { Course } from '../../core/classes/course';
import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-guardian',
  templateUrl: './add.component.html',
  styleUrls: []
})
  
export class AddComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  guardian : Guardian;
  courses: Course[];


  constructor(
    private _guardianService: GuardianService,
    private _courseService: CourseService,
    private _utils: UtilsService,
    private router: Router
    ) { }
  
  ngOnInit() {
    this.initGuardian();
    this.loadCourses();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._guardianService.add(this.guardian)
      .subscribe(data => {
        console.log(data);
        alert('guardian added');
      });
  }

  loadCourses() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this.courses = data : data;
        console.log(this.courses);

      }
    );
  }

  initGuardian() {
    this._utils.unsubscribeSub(this._typeSub);
    this.guardian = new Guardian();
  }

 
}
