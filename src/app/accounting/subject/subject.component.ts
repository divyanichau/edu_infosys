import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/classes/student';
import { UtilsService } from '../../shared/services/utils.service';
import  { SubjectService } from '../../core/services/subject.service';
import { Subject } from '../../core/classes/subject';

declare var numeral: any;
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: []
})
  
export class SubjectComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

  _students: Student[];
  subject : Subject;
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
    this._utils.unsubscribeSub(this._sub);
    console.log(this._students);
    this._sub = this._studentService.add(this._students)
      .subscribe(data => {
        console.log(data);
        alert('Student added to section');
      });
  }


loadStudents() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._studentService.get().subscribe(
      data => {
        isArray(data) ? this._students = data : data;
        console.log(this._students)
       // this.selected_student = this._students[0].id;
       //   console.log(this.subject)
      }
    );
  }
  
  initAddStudent() {
    this._utils.unsubscribeSub(this._typeSub);
     //this.section = new Section();    
    //this.subject = new Subject();
  }

 
}




