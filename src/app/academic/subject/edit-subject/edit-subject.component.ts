import {switchMap} from 'rxjs/operators';
import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { isArray, isObject} from 'lodash';
import { ToastrService } from 'ngx-toastr';


import{ DatatableComponent} from '@swimlane/ngx-datatable';
import { SubjectService } from '../../../core/services/subject.service';
import { Subject } from '../../../core/classes/subject';
import { UtilsService } from '../../../shared/services/utils.service';


@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: []
})
export class EditSubjectComponent implements OnInit {
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  subject : Subject;
  id: string;

 @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
  	private _routes: ActivatedRoute,
    private _subjectService: SubjectService,
    private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService
    ) { }
  


  ngOnInit() {
  	 this.initSubject();
  }

 initSubject() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._routes.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this._subjectService.find(this.id);
      }))
      .subscribe(data => {
        if (isObject(data)) {
          this.subject = data;
          console.log(this.subject);
        }
      });

  }


   onSubmitUpdateSubject(){
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._subjectService.update(this.subject, this.id)
      .subscribe(data => {
        this.router.navigate(['/subject/add-subject']);
      });
  }
}

