import { Subscription } from 'rxjs';
import { isArray } from 'lodash';

import { UtilsService } from '../../shared/services/utils.service';
import { CourseService } from '../services/course.service';
import { SectionService } from '../../core/services/section.service';
import { ClassService } from '../../core/services/class.service';
import { SubjectService } from '../../core/services/subject.service';
//import { SetTermService } from '../services/set-term.service';

import { Course } from '../classes/course';
import { Section } from '../../core/classes/section';
import { _class } from '../../core/classes/class';
import { Subject } from '../../core/classes/subject';
import { setTerm } from '../classes/exam/set-term';



export class AcademicMixin {
    _sub: Subscription = undefined;
    _typeSub: Subscription = undefined;

    courses: Course[];
    classes: _class[];
    sections: Section[];
    subjects:Subject[];
   // _seterm : setTerm[];

    course: Course = new Course();
    __class: _class = new _class();
    section: Section = new Section();

    selected_course: number;
    selected_class: number;
    selected_section: number;
    selected_subject: number;

    rows: any[] = [];
    temp: any[] = [];
    editing = {};
  


    constructor(
        public _utils: UtilsService,
        public _courseService: CourseService,
        public _classService: ClassService,
       // private _setTermService:SetTermService
       // public _sectionService: SectionService,
        //public _subjectService:SubjectService

    ) {
        //console.log('initialized AcademicMixin..')
    }


    initCourse() {

        this._utils.unsubscribeSub(this._sub);
        this._sub = this._courseService.get().subscribe(
            data => {
                isArray(data) ? this.courses = data : data;
                if (this.courses.length > 0) {
                    this.selected_course = this.courses[0].id;
                    this.initClass();
                }
            }
        );
    }



    initClass() {
        this._utils.unsubscribeSub(this._sub);
        this._sub = this._classService.getWithCourse(this.selected_course).subscribe(
            data => {
                isArray(data) ? this.classes = data : data;
                if (this.classes.length > 0) {
                    this.selected_class = this.classes[0].id;
                    this.initSection();
                }

                this.temp = [...this.classes];

            }
        );
    }

    initSection() {
        console.log(this.selected_class);
        this._utils.unsubscribeSub(this._typeSub);
       // this._sub = this._sectionService.getWithClass(this.selected_class).subscribe(
            data => {
                isArray(data) ? this.sections = data : data;

                if (this.sections.length > 0) {
                    this.selected_section = this.sections[0].id;
                    //this.initSubject(this.selected_section);
                }
                this.temp = [...this.sections];

            }
  // );
  }
   
//   initSubject(id:number){
//     console.log("gdjdgjdgjaSub",id);
//     this._utils.unsubscribeSub(this._typeSub);
//     this._sub = this._subjectService.getWithSection(this.selected_section).subscribe(
//         data => {
//             isArray(data) ? this.subjects = data : data;

//             if (this.subjects.length > 0) {
//                 this.selected_subject = this.subjects[0].id;
//             }
//             this.temp = [...this.sections];

//         }
//     );
//   }

// loadExamTerm() {
//     this._utils.unsubscribeSub(this._sub);
//     this._sub = this._setTermService.get().subscribe(
//       data => {
//         isArray(data) ? this._seterm = data : data;
       
//       }
//     );
//   }

    onCourseChange(course_id) {
        this.selected_course = course_id;
        console.log(this.selected_course)
        this.initClass();
     //   this.loadExamTerm()
    }

    onClassChange(class_id) {
        this.selected_class = class_id;
         this.initSection();
        // this.loadExamTerm()
    }

    onSectionChange(section_id) {
        console.log("Section Id",section_id);
        this.selected_section = section_id;
        this.initSection();
    }



    updateValue(event, cell, rowIndex) {
        console.log('inline editing rowIndex', rowIndex)
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = [...this.rows];
        console.log('UPDATED!', this.rows[rowIndex][cell]);
    }


}