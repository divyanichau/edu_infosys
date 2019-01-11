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


declare var numeral: any;
@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: []
})
  
export class AddSectionComponent extends  AcademicMixin implements OnInit , OnDestroy{


@ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private router: Router,
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
    console.log(this.section);
    this._sub = this._sectionService.add(this.selected_class, this.section)
      .subscribe(data => {
        this.initSection()
      });
  }



  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.sections = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  

  sectionDelete(id:number){
      console.log(id);
      if(confirm("Are You Sure Want To Delete?")){
        this._sectionService.delete(this.selected_class, id).subscribe(data => 
          {
            this.initSection()
         },(err)=>{
           console.log(err);
           
         }
         );
       }
    }

  

}




