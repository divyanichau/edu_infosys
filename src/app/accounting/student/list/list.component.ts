import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';


import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/classes/student';
import { UtilsService } from '../../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: []
})
  
export class ListComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  students : Student[];
  total_students : number;
  dataTable: any;

  constructor(
    private _studentService: StudentService,
    private _utils: UtilsService,
    private router: Router
    ) { }
  
  ngOnInit() {

    this.initStudent();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }


  initStudent() {
   this._utils.unsubscribeSub(this._sub);
    this._sub = this._studentService.get().subscribe(
      data => {
        isArray(data) ? this.students = data : data;
        // this.total_students = data.length;
        // const table: any = $('.dataTable');
  	// this.dataTable = table.DataTable({
   //    select: true
   //  });
    

        

      }
    );
  }

 
}
