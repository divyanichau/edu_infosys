import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import { ToastrService } from 'ngx-toastr';

import{ DatatableComponent} from '@swimlane/ngx-datatable';
import { SectionService } from '../../core/services/section.service';
import { ClassService } from '../../core/services/class.service';

import { Section } from '../../core/classes/section';
import { _class } from '../../core/classes/class';
import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: []
})
  
export class AddSectionComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  
  _section = [];
   obj : Section[];

  section : Section = new Section();
  _classes: _class[];
  selected_class: number;

   rows: any[] = [];
  temp: any[] = [];
  editing = {};

@ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _sectionService: SectionService,
    private _classService: ClassService,
    private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService
    ) { }
  
  ngOnInit() {
    this.initSection();
   
   
    //this.section.r_class = 1; //Change this to api returned class array first element
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    //this.section._class = this.selected_class;
    this._utils.unsubscribeSub(this._sub);
    this.section._class = this.selected_class;
    console.log(this.section);
    this._sub = this._sectionService.add(this.section)
      .subscribe(data => {
        console.log(data);
        this.toastr.success('Section Added !', 'Success',{timeOut: 3000});
         this.loadClasses();
      });
  }

  loadClasses() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._classService.get().subscribe(
      data => {
        isArray(data) ? this._classes = data : data;
        console.log(this._classes);
        this.selected_class = this._classes[0].id;
        console.log(this.section);
          
      }
    );
  }

  
  initSection() {
    this._utils.unsubscribeSub(this._typeSub);
      this._sub = this._sectionService.get().subscribe(
      data => {
        isArray(data) ? this._section = data : data;
        this.rows = this._section;
        this.temp = [...this._section];

      }
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this._section = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

  sectionDelete(id:number){
      console.log(id);
      if(confirm("Are You Sure Want To Delete?")){
        this._sectionService.delete(id).subscribe(data => 
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
}




