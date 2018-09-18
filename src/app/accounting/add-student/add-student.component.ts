import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { Section } from '../../core/classes/section';
import { SectionService } from '../../core/services/section.service';
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
  _students: Student[];
  selected_student: number;
  section: Section;
  selected_section: number;
  _sections: Section[];
  //roll_no: number;
  section_student = {};

  constructor(
    private _studentService: StudentService,
     private _sectionService: SectionService,
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
    //this.section_student  = {student_id : this.selected_student, section_id: this.selected_section, roll_no: this.roll_no}
    console.log(this.section_student);
    this._sub = this._sectionService.addStudent(this.section_student)
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
        this.selected_student = this._students[0].id;
        this.loadSections();
      
      }
    );
  }


  loadSections() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._sectionService.get().subscribe(
      data => {
        isArray(data) ? this._sections = data : data;
        console.log(this._sections)
        this.selected_section = this._sections[0].id;
      
      }
    );
  }


  initAddStudent() {
    this._utils.unsubscribeSub(this._typeSub);
     this.section = new Section();
    
    //this.students = new Student();
  }

 
}




