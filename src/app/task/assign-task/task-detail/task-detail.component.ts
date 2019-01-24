import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { switchMap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { isArray, isObject  } from 'lodash';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import{ DatatableComponent} from '@swimlane/ngx-datatable';
//import { CourseService } from '../../../core/services/course.service';
//import { BatchService } from '../../../core/services/batch.service';
import { TaskService } from '../../../core/services/task.service';
import { UtilsService } from '../../../shared/services/utils.service';
import { EventService } from '../../../core/services/event.service';
import { Task} from '../../../core/classes/event/task';
import { Event,EventType } from '../../../core/classes/event/event';
//import { Course} from '../../../core/classes/course';
//import { Batch} from '../../../core/classes/batch';




@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: []
})
export class TaskDetailComponent implements OnInit, OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

   task : Task = new Task() ;
   tasks: Task[];
   //courses: Course[];
   //batch: Batch[];
   events: Event[];

 selected_event: number;
 // // selected_course: number;
 //  //selected_batch : number;
  selected_task:number;
  id:string;

  rows: any[] = [];
  temp: any[] = [];
  editing = {};

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private taskService: TaskService,
    private _eventService: EventService,
   // private _courseService: CourseService,
    //private _batchService: BatchService,
    private _utils: UtilsService,
    private _routes:ActivatedRoute,
    private router: Router,
    private _router:Router,
    private toastr: ToastrService
    ) { }
  
  ngOnInit() {

    this.initTask();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }
   
 OnSubmitTaskUpdate(){
    console.log("Data To Be Updated",this.selected_task);
    //console.log(this.id);
    this._utils.unsubscribeSub(this._sub);
    this._sub = this.taskService.update(this.task,this.id)
      .subscribe(data => {
       this._router.navigate(['/task/assign-task']);
      });
 }

  // loadCourses() {
  //   this._utils.unsubscribeSub(this._sub);
  //   this._sub = this._courseService.get().subscribe(
  //     data => {
  //       isArray(data) ? this.courses = data : data;
  //       this.loadBatch();

  //        if(this.courses.length > 0){
  //         this.selected_course = this.courses[0].id;
  //       }
  //     }
  //   );
  // }

  //  loadBatch() {
  //   this._utils.unsubscribeSub(this._sub);
  //   this._sub = this._batchService.get().subscribe(
  //     data => {
  //       isArray(data) ? this.batch = data : data;
  //        this.loadEvents();
  //       if(this.batch.length > 0){
  //        this.selected_batch = this.batch[0].id;
  //       }
  //     }
  //   );
  // }

 loadEvents() {
     this._utils.unsubscribeSub(this._sub);
     this._sub = this._eventService.getEvent().subscribe(
       data => {
         isArray(data) ? this.events = data : data;
         console.log("events",this.events);
       //    if(this.event.length > 0){
       //    this.selected_event = this.event[0].id;
       // }
         
       }
     );

  }

 // initTask() {
 //     this._utils.unsubscribeSub(this._sub);
 //     this._sub = this.taskService.get().subscribe(
 //       data => {
 //         isArray(data) ? this.task = data : data;
 //         //console.log(this.event);
 //          if(this.task.length > 0){
 //          this.selected_task = this.task[0].id;
 //       }
         
 //       }
 //     );

 //  }
  initTask() {
    this._utils.unsubscribeSub(this._typeSub);
    this._sub = this._routes.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this.taskService.find(this.id);
      }))
      .subscribe(data => {
        if (isObject(data)) {
        this.task = data;
         this.loadEvents();
      }
     });
  }

    
 }


 






