import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import { CourseService } from '../../core/services/course.service';
import { TransportService } from '../../core/services/transport.service';
import { Transport } from '../../core/classes/transport';
import { Course } from '../../core/classes/course';
import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-transport',
  templateUrl: './add.component.html',
  styleUrls: []
})
  
export class AddComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  transport : Transport;
  courses: Course[];


  constructor(
    private _transportService: TransportService,
    private _courseService: CourseService,
    private _utils: UtilsService,
    private router: Router
    ) { }
  
  ngOnInit() {
    this.initTransport();
    this.loadCourses();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._transportService.add(this.transport)
      .subscribe(data => {
        console.log(data);
        alert('vehicle added');
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

  initTransport() {
    this._utils.unsubscribeSub(this._typeSub);
    this.transport = new Transport();
  }

 
}
