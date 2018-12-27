import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

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
  obj : Subject;
  subjects = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _subjectService: SubjectService,
    private _utils: UtilsService,
    private router: Router
    ) { }
  
  ngOnInit() {
    this.initSubject();
    this.loadSubjects();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.obj)
    this._sub = this._subjectService.add(this.obj)
      .subscribe(data => {
        console.log(data);
        alert('Subject added');
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
    this.obj = new Subject();
  }

 
}




