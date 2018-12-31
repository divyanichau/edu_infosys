import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../shared/services/utils.service';

import { BatchService } from '../../core/services/batch.service'
import { CourseService } from '../../core/services/course.service';
import { ClassService } from '../../core/services/class.service';
import { SectionService } from '../../core/services/section.service';
import { StudentService } from '../../core/services/student.service';
import { _RouteService } from '../../core/services/_route.service';
import { AllocateTransportService } from '../../core/services/allocate-transport.servie';



import { Batch } from '../../core/classes/batch'
import { Course } from '../../core/classes/course';
import { _class } from '../../core/classes/class';
import { Section } from '../../core/classes/section';
import { Student } from '../../core/classes/student';
import { _Route } from '../../core/classes/_route';
import { allocate_transport } from '../../core/classes/allocate-transport'




@Component({
  selector: 'app-allocate-transport',
  templateUrl: './allocate-transport.component.html',
  styleUrls: ['./allocate-transport.component.css']
})
export class AllocateTransportComponent implements OnInit {
  private _sub: Subscription = undefined;
  _batch: Batch[];
  _course: Course[];
  class: _class[];
  _section: Section[]
  _student: Student[];
  _route: _Route[]
  _allocate_transport: allocate_transport = new allocate_transport();

  selected_batch: number;
  selected_course: number;
  selected_class: number;
  selected_section: number;
  selected_student: number;
  selected_route: number;


  constructor(
    private _utils: UtilsService,
    private toastr: ToastrService,
    private _batchService: BatchService,
    private _courseService: CourseService,
    private _classService: ClassService,
    private _sectionService: SectionService,
    private _studentService: StudentService,
    private _routeService: _RouteService,
    private _transportAllocateService:AllocateTransportService
  ) { }

  ngOnInit() {
    this.loadBatch();

  }

  loadBatch() {
    // console.log("Batch Loaded");
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._batchService.get().subscribe(
      data => {
        isArray(data) ? this._batch = data : data;
        // console.log("Total Batch", this._batch);
        this.selected_batch = this._batch[0].id;
        this.loadCourse();

      }
    );
  }
  loadCourse() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this._course = data : data;
        // console.log("Total Course", this._course);
        this.selected_course = this._course[0].id;
        this.loadClass();
      }
    );
  }
  loadClass() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._classService.get().subscribe(
      data => {
        isArray(data) ? this.class = data : data;
        // console.log("Total class", this.class);
        this.selected_class = this._course[0].id;
        this.loadSection();
      }
    );
  }
  loadSection() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._sectionService.get().subscribe(
      data => {
        isArray(data) ? this._section = data : data;
        //console.log("Total section", this._section);
        this.selected_section = this._section[0].id;
        this.getStudent();
      }
    );
  }
  getStudent() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._studentService.get().subscribe(
      data => {
        isArray(data) ? this._student = data : data;
        // console.log("Total Student", this._student);
        this.selected_student = this._student[0].id;
        this.getRoute();
      }
    );
  }
  getRoute() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._routeService.get().subscribe(
      data => {
        isArray(data) ? this._route = data : data;
        //console.log("Total route", this._route);
        this.selected_route = this._route[0].id;
      }
    );
  }

  allocateTransport() {
    this._utils.unsubscribeSub(this._sub);
    
    this._allocate_transport.batch=this.selected_batch;
    this._allocate_transport.course=this.selected_course;
    this._allocate_transport._class=this.selected_class;
    this._allocate_transport.section=this.selected_section;
    this._allocate_transport.student=this.selected_student;
    this._allocate_transport.route=this.selected_route;
    console.log(this._allocate_transport);
     
     this._sub = this._transportAllocateService.add(this._allocate_transport)

    .subscribe(data => {

    }, err => {
      
     
    });
 
  }
}

