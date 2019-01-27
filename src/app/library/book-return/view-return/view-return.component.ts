import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { isArray ,isObject} from 'lodash';

import { UtilsService } from '../../../shared/services/utils.service';
import { LibraryService } from '../../../core/services/library.service';
import { BookReturn } from '../../../core/classes/bookreturn';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-return',
  templateUrl: './view-return.component.html',

})
export class ViewReturnComponent implements OnInit {
  private _sub: Subscription = undefined;
   id: string;
    _return : BookReturn = new BookReturn();
  selected_book: number;

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
        return this._libraryService.findReturn(this.id);
      }))
      .subscribe(data => {
        if (isObject(data)) {
         console.log("vhgv",data);
         this._return = data;
        console.log("Edit Book",this._return);
        }
      });
  }

 
  onSubmitDetail(){
    console.log(this.id);
    this._utils.unsubscribeSub(this._sub);
  this._sub = this._libraryService.updateReturn(this._return,this.id).subscribe(
      data => {
        console.log("Updated Data",data);
        this._router.navigate(['library/view-return']);

      }
    );
    
  }

}
