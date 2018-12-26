import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import {DatatableComponent}  from '@swimlane/ngx-datatable';
import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/classes/student';
import { UtilsService } from '../../shared/services/utils.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: []
})
export class ViewDetailComponent implements OnInit {
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  students : Student[];
  total_students : number;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _studentService: StudentService,
    private _utils: UtilsService,
    private router: Router
  ) {}

  rows = [];
  temp = [];

  ngOnInit() {
    this.initStudent();
  }

  initStudent() {
    this._utils.unsubscribeSub(this._sub);
     this._sub = this._studentService.get().subscribe(
       data => {
         isArray(data) ? this.students = data : data;
         this.rows = this.students;
         this.temp = [...this.students];
 
       }
     );  
   }
   
   updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.user.first_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  
  ViewMoreClickEvent(employeeId:number){
    this.router.navigate(['/student/edit',employeeId]);
  }

}
