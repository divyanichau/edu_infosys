import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/classes/student';
import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: []
})
  
export class AddStudentComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  students: Student[];
  selected_student: number;


  constructor(
    private _studentService: StudentService,
    private _utils: UtilsService,
    private router: Router
    ) { }
  
  ngOnInit() {
    this.initAddStudent();
    this.loadStudents();
    

  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    // this._utils.unsubscribeSub(this._sub);
    // console.log(this.students)
    // this._sub = this._studentService.add(this.students)
    //   .subscribe(data => {
    //     console.log(data);
    //   });
  }
loadStudents() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._studentService.get().subscribe(
      data => {
        isArray(data) ? this.students = data : data;
        
        this.selected_student = this.students[0].id;
      }
    );
  }


  initAddStudent() {
    this._utils.unsubscribeSub(this._typeSub);
    //this.students = new Student();
  }

 
}




