import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import { SectionService } from '../../core/services/section.service';
import { Section } from '../../core/classes/section';
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
  obj : _class;


  constructor(
    private _sectionService: SectionService,
    private _utils: UtilsService,
    private router: Router
    ) { }
  
  ngOnInit() {
    this.initClass();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.obj)
    this._sub = this.sectionService.add(this.obj)
      .subscribe(data => {
        console.log(data);
        alert('Class added');
      });
  }

  initClass() {
    this._utils.unsubscribeSub(this._typeSub);
    this.obj = new _class();
  }

 
}




