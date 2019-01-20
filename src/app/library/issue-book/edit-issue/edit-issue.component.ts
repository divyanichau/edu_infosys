import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { isArray ,isObject} from 'lodash';

import { UtilsService } from '../../../shared/services/utils.service';
import { LibraryService } from '../../../core/services/library.service';
import { IssueBook } from '../../../core/classes/issuebook';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',

})
export class EditIssueComponent implements OnInit {
  private _sub: Subscription = undefined;
   id: string;
  _obj_book : IssueBook = new IssueBook();
  selected_category: number;

  constructor(
    private _libraryService: LibraryService,
    private _utils: UtilsService,
     private _routes:ActivatedRoute,
    private _router: Router,
    private toastr: ToastrService
    ) { }


  ngOnInit() {
   this.initEdit();
   
  }
  initEdit(){
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._routes.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this._libraryService.findIssue(this.id);
      }))
      .subscribe(data => {
        if (isObject(data)) {
         this._obj_book = data;
         console.log("echeduled Exam",this._obj_book );
        }
      });
  }

 
  onSubmitEditUpdate(){
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._libraryService.updateIssue(this._obj_book ,this.id).subscribe(
      data => {
        //console.log("Updated Data",data);
        this._router.navigate(['library/issue-book']);

      }
    );
    
  }

}
