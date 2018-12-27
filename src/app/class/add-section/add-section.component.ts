import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

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
    private router: Router
    ) { }
  
  ngOnInit() {
    this.initSection();
    this.loadClasses();
   
    //this.section.r_class = 1; //Change this to api returned class array first element
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this.section._class = this.selected_class;
    this._utils.unsubscribeSub(this._sub);
    console.log(this.section)
    this._sub = this._sectionService.add(this.section)
      .subscribe(data => {
        console.log(data);
        alert('Section added');
      });
  }

  loadClasses() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._classService.get().subscribe(
      data => {
        isArray(data) ? this._classes = data : data;
        console.log(this._classes)
        this.selected_class = this._classes[0].id;
        console.log(this.section)
         this.loadSection();  
      }
    );
  }

    loadSection() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._sectionService.get().subscribe(
      data => {
        isArray(data) ? this._section = data : data;
        console.log(this._section)

      }
    );
  }

  initSection() {
    this._utils.unsubscribeSub(this._typeSub);
      this._sub = this._sectionService.get().subscribe(
      data => {
        isArray(data) ? this.obj = data : data;
        this.rows = this.obj;
        this.temp = [...this.obj];

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
    this.rows = temp;
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
}




