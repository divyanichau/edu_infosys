

import { Subscription } from 'rxjs';
import { isArray } from 'lodash';

import { UtilsService } from '../../shared/services/utils.service';
import { StudentService } from '../services/student.service';

import { Student } from '../classes/student';


export class StudentMixin {
	_sub: Subscription = undefined;
  	_typeSub: Subscription = undefined;

  	students: Student[];
  	
  	student: Student = new Student();
  	
  	selected_student: number;


  	rows: any[] = [];
	temp: any[] = [];
	editing = {};


	constructor(
    	public _utils: UtilsService,
    	public _studentService: StudentService,

  	) { 
		console.log('initializedStudentMixin..')
  	}



  initStudent(section_id) {
    this._utils.unsubscribeSub(this._typeSub);
      this._sub = this._studentService.getBySection(section_id).subscribe(
      data => {
        isArray(data) ? this.students = data : data;
        if (this.students.length > 0) {
            this.selected_student = this.students[0].id;
           
        }
        this.temp = [...this.students];

      }
    );
  }


  loadSectionStudent(section_id){
    this.initStudent(section_id);
  }


}  