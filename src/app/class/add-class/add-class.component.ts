import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import{ DatatableComponent} from '@swimlane/ngx-datatable';

import { ClassService } from '../../core/services/class.service';
import { UtilsService } from '../../shared/services/utils.service';
import { CourseService } from '../../core/services/course.service';
import { SectionService } from '../../core/services/section.service';



import { AcademicMixin } from '../../core/mixins/academic.mixin';


declare var numeral: any;
@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: []
})
  
export class AddClassComponent extends AcademicMixin implements OnInit , OnDestroy{

 
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
    console.log(this.__class);
    this._sub = this._classService.add(this.selected_course, this.__class)
      .subscribe(data => {
        this.initClass();
      });
  }


  
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.classes = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }


 classDelete(id:number){
      console.log(id);
      if(confirm("Are You Sure Want To Delete?")){
        this._classService.delete(this.selected_course, id).subscribe(data => 
          {
          this.initClass();
         },(err)=>{
           console.log(err)
         }
         );
       }
    }

}






