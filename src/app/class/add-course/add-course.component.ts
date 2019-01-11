import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import{ DatatableComponent} from '@swimlane/ngx-datatable';

import { UtilsService } from '../../shared/services/utils.service';
import { CourseService } from '../../core/services/course.service';
import { SectionService } from '../../core/services/section.service';
import { ClassService } from '../../core/services/class.service';

import { AcademicMixin } from '../../core/mixins/academic.mixin';


declare var numeral: any
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: []
})
  
export class AddCourseComponent extends AcademicMixin implements OnInit , OnDestroy{


@ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    _utils: UtilsService,
     _courseService: CourseService,
     _classService: ClassService,
     _sectionService: SectionService,
    ) { 
     super(_utils, _courseService, _classService, _sectionService)
  }
  
  ngOnInit() {
    this.initCourse();
   
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.course);
    this._sub = this._courseService.add(this.course)
      .subscribe(data => {
        console.log(data);
        this.initCourse();
      });
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.courses = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  courseDelete(id:number){
      console.log(id);
      if(confirm("Are You Sure Want To Delete?")){
        this._courseService.delete(id).subscribe(data => 
          {
          this.initCourse();
         },(err)=>{
           console.log(err);
         }
         );
       }
    }
}





