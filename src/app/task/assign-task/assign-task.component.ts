import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import{ DatatableComponent} from '@swimlane/ngx-datatable';

import { TaskService} from '../../core/services/task.service';
import { StudentService} from '../../core/services/student.service';
import { CourseService } from '../../core/services/course.service';
import { BatchService } from '../../core/services/batch.service';
import { UtilsService } from '../../shared/services/utils.service';
import { Task} from '../../core/classes/event/task';
import { Student } from '../../core/classes/student';
import { Course } from '../../core/classes/course';
import { Batch } from '../../core/classes/batch';


@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: []
})
export class AssignTaskComponent implements OnInit {
	private _sub: Subscription = undefined;
    private _typeSub: Subscription = undefined;

    selectedDevice = 'Student';
    default_detail_type = {1:false, 2:false};

    detail_type = this.default_detail_type;

    _task : Task = new Task() ;
    _tasks: Task[];
    student: Student[];
    course: Course[];
    batch: Batch[];

    selected_student: number;
    selected_course: number;
    selected_batch :number;
    selected_task: number;

   onChange(newValue) {
    this.reset_details_value();

    this.detail_type[newValue] = true;
  }

   reset_details_value(){
    this.detail_type = this.default_detail_type;

    this.detail_type[1]=false;
    this.detail_type[2]=false;
  }

   rows: any[] = [];
   temp: any[] = [];
   editing = {};

 @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _taskService: TaskService,
    private studentService: StudentService,
    private courseService: CourseService,
    private batchService: BatchService,
   	private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService
    ) { }


  ngOnInit() {
  	this.reset_details_value();
    this.detail_type[1]= true; 
  	this.initTask();
  	this.loadCourse();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

 OnSubmitTask() {
      console.log("gfgf",this.selected_task);
    this._utils.unsubscribeSub(this._sub);
   console.log("fcrcr",this._task)
    this._sub = this._taskService.add(this._task)
      .subscribe(data => {
        //console.log(data);
         this.toastr.success('Assign  Task !', 'Success',{timeOut: 3000});

      });
  }

  loadCourse() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this.courseService.get().subscribe(
      data => {
        isArray(data) ? this.course = data : data;
        console.log(this.course);
        this.selected_course = this.course[0].id;
         this.loadBatch();
      }
    );
  }

  loadBatch() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this.batchService.get().subscribe(
      data => {
        isArray(data) ? this.batch = data : data;
        console.log(this.batch);
        this.selected_batch = this.batch[0].id;
       this.loadStudent();
      }
    );
  }
   
  loadStudent() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this.studentService.get().subscribe(
      data => {
        isArray(data) ? this.student = data : data;
        console.log(this.student);
        this.selected_student = this.student[0].id;
         
      }
    );

  }

  initTask() {
    this._utils.unsubscribeSub(this._typeSub);
      this._sub = this._taskService.get().subscribe(
      data => {
         console.log("hfw",data)
        isArray(data) ? this._tasks = data : data;
        this.rows = this._tasks;
        this.temp = [...this._tasks];
      }
      
    );
    this._task= new Task();

  }

}
