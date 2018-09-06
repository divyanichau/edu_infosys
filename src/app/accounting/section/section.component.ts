
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
  section : Section;


  constructor(
    private _sectionService: SectionService,
    private _utils: UtilsService,
    private router: Router
    ) { }
  
  ngOnInit() {
    this.initSection();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.section)
    this._sub = this._sectionService.add(this.section)
      .subscribe(data => {
        console.log(data);
        alert('Section added');
      });
  }

  initSection() {
    this._utils.unsubscribeSub(this._typeSub);
    this.section = new Section();
  }

 
}




