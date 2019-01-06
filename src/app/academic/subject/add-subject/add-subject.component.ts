import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import{ DatatableComponent} from '@swimlane/ngx-datatable';
import { SubjectService } from '../../../core/services/subject.service';
import { Subject } from '../../../core/classes/subject';
import { UtilsService } from '../../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: []
})
  
export class AddSubjectComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  subject : Subject;
  subjects = [];

  rows: any[] = [];
  temp: any[] = [];
  editing = {};


  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _subjectService: SubjectService,
    private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService
    ) { }
  
  ngOnInit() {
    this.initSubject();
   // this.loadSubjects();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  OnSubmitSubject() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.subject)
    this._sub = this._subjectService.add(this.subject)
      .subscribe(data => {
        console.log(data);
         this.toastr.success('Subject Added !', 'Success',{timeOut: 3000});

      });
  }


   loadSubjects() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._subjectService.get().subscribe(
      data => {
        isArray(data) ? this.subjects = data : data;
        console.log(this.subjects)

      }
    );
  }

  initSubject() {
    this._utils.unsubscribeSub(this._typeSub);
      this._sub = this._subjectService.get().subscribe(
      data => {
        isArray(data) ? this.subjects = data : data;
        this.rows = this.subjects;
        this.temp = [...this.subjects];
      }
      
    );
    this.subject= new Subject();

  }

 subjectDelete(id:number){
      console.log(id);
      if(confirm("Are You Sure Want To Delete?")){
        this._subjectService.delete(id).subscribe(data => 
          {
          //console.log(data);
          // this.toastr.success('Vehicle Added !', 'Success', { timeOut: 3000 });
         },(err)=>{
           console.log(err);
           alert(err);
         }
         );
       }
    }
   

   updateFilter(event) {
     const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
     // console.log(d.student.toLowerCase(), val)
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.subjects = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  // updateValue(event, cell, rowIndex) {
  //   console.log('inline editing rowIndex', rowIndex)
  //   this.editing[rowIndex + '-' + cell] = false;
  //   this.rows[rowIndex][cell] = event.target.value;
  //   this.rows = [...this.rows];
  //   console.log('UPDATED!', this.rows[rowIndex][cell]);
  // }
    
  }


 





