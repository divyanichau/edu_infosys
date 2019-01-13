import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import{ DatatableComponent} from '@swimlane/ngx-datatable';
import { TaskService } from '../../core/services/task.service';
import { Task} from '../../core/classes/event/task';
import { UtilsService } from '../../shared/services/utils.service';



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


  rows: any[] = [];
  temp: any[] = [];
  editing = {};

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private taskService: TaskService,
    private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService
    ) { }
  
  ngOnInit() {
    this.initTask();
   
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  OnSubmitTask() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.task)
    this._sub = this.taskService.add(this.task)
      .subscribe(data => {
        console.log(data);
         this.toastr.success(' Assign Task !', 'Success',{timeOut: 3000});

      });
  }


   loadTasks() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this.taskService.get().subscribe(
      data => {
        isArray(data) ? this.tasks = data : data;
        console.log(this.tasks)

      }
    );
  }

  initTask() {
    this._utils.unsubscribeSub(this._typeSub);
      this._sub = this.taskService.get().subscribe(
      data => {
        isArray(data) ? this.tasks = data : data;
        this.rows = this.tasks;
        this.temp = [...this.tasks];
      }
      
    );
    this.task= new Task();

  }

  taskDelete(id:number){
      console.log(id);
      if(confirm("Are You Sure Want To Delete?")){
        this.taskService.delete(id).subscribe(data => 
          {
          //console.log(data);
          // this.toastr.success('Assign Task !', 'Success', { timeOut: 3000 });
         },(err)=>{
           console.log(err);
           alert(err);
         }
         );
       }
    }
   

   updateFilter(event) {
     const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.tasks = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

    
  }


 






