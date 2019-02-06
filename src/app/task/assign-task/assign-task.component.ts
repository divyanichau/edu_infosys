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
import { EventService } from '../../core/services/event.service';
import { Event,EventType } from '../../core/classes/event/event';
import { Task}  from '../../core/classes/event/task';
import { Student} from '../../core/classes/student';
import { Course} from '../../core/classes/course';
import { Batch} from '../../core/classes/batch';


@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: []
 })

 export class AssignTaskComponent implements OnInit {
	  private _sub: Subscription = undefined;
    private _typeSub: Subscription = undefined;

    selectedDevice = 'Student';
    default_detail_type = {1:false, 3:false};

    detail_type =  {1:false, 3:false};

    task : Task = new Task();
    tasks: Task[];
    student: Student[];
    courses: Course[];
    batch: Batch[];
    event: Event[];
    selected_student: number;
    selected_event: number;
    selected_course: number;
    selected_batch : number;
    selected_task: number;

   onChange(newValue) {
    this.reset_details_value();

    this.detail_type[newValue] = true;
  }

   reset_details_value(){

    this.detail_type = this.default_detail_type;

    this.detail_type[1]=false;
    this.detail_type[3]=false;
  }

   rows: any[] = [];
   temp: any[] = [];
   editing = {};

 @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private taskService: TaskService,
    private _studentService: StudentService,
    private _courseService: CourseService,
    private _eventService: EventService,
    private _batchService: BatchService,
   	private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService
    ) { }


  ngOnInit() {
  	this.reset_details_value();
    this.detail_type[1]= true; 

  	this.initTask();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

 OnSubmitTask() {
    this.task.batch=this.selected_batch;
    this.task.course=this.selected_course;
     this.task.event=this.selected_event;
    this.task.student=this.selected_student;
    this._utils.unsubscribeSub(this._sub);
    console.log(this.task)
    this._sub = this.taskService.add(this.task)
      .subscribe(data => {
         this.toastr.success('Assign  Task !', 'Success',{timeOut: 3000});
        
      });
  }

  loadCourses() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this.courses = data : data;
        this.loadBatch();

         if(this.courses.length > 0){
          this.selected_course = this.courses[0].id;
        }
      }
    );
  }


 loadBatch() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._batchService.get().subscribe(
      data => {
        isArray(data) ? this.batch = data : data;
         this.loadStudent();
        if(this.batch.length > 0){
         this.selected_batch = this.batch[0].id;
        }
      }
    );
  }

  loadStudent() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._studentService.get().subscribe(
       data => {
        isArray(data) ? this.student = data : data;
       console.log(this.student);
        this.loadEvents();
        if(this.student.length > 0){
         this.selected_student = this.student[0].id;
      }
         
     }
    );

   }


  loadEvents() {
     this._utils.unsubscribeSub(this._sub);
     this._sub = this._eventService.getEvent().subscribe(
       data => {
         isArray(data) ? this.event = data : data;
         console.log(this.event);
          if(this.event.length > 0){
          this.selected_event = this.event[0].id;
       }
         
       }
     );

  }

  initTask() {
    this._utils.unsubscribeSub(this._typeSub);
      this._sub = this.taskService.get().subscribe(
      data => {
         console.log("hfw",data)
        isArray(data) ? this.tasks = data : data;
        this.rows = this.tasks;
        this.temp = [...this.tasks];
        this.loadCourses();
      }
      
    );
     this.task= new Task();

  }

  deleteTask(id:number){
    if(confirm("Are You Sure Want To Delete?")){
      this.taskService.delete(id).subscribe(data => 
        {
        //console.log(data);
        alert("Deleted");
       },(errr)=>{
         console.log(errr);
       }
       );
     }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.tasks = temp;
    this.table.offset = 0;
  }

}
