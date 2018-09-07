                                                                                                  
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { SectionService } from '../../core/services/section.service';
import { ClassService } from '../../core/services/class.service';

import { Section } from '../../core/classes/section';
import { _class } from '../../core/classes/class';

import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: []
})
  
export class SectionComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  section : Section;
  _classes: _class[];
  selected_class: number;

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
    this.section.class_id = this.selected_class;
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
      }
    );
  }

  initSection() {
    this._utils.unsubscribeSub(this._typeSub);
    this.section = new Section();
    this.section.name = 'A';

    //this.obj = {};
  }

  // selectClass(v) {
  //   this.selected_class = v;
  // }

 
}




