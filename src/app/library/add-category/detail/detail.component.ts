import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { isArray ,isObject} from 'lodash';

import { UtilsService } from '../../../shared/services/utils.service';
import { LibraryService } from '../../../core/services/library.service';
import { BookCategory } from '../../../core/classes/bookcategory';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',

})
export class DetailComponent implements OnInit {
  private _sub: Subscription = undefined;
   id: string;
   obj_category : BookCategory = new BookCategory();
  selected_category: number;

  constructor(
    private _libraryService: LibraryService,
    private _utils: UtilsService,
     private _routes:ActivatedRoute,
    private _router: Router,
    private toastr: ToastrService
    ) { }


  ngOnInit() {
   this.initDetail();
   
  }
  initDetail(){
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._routes.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this._libraryService.find(this.id);
      }))
      .subscribe(data => {
        if (isObject(data)) {
          this.obj_category = data;
         console.log("echeduled Exam",this.obj_category);
        }
      });
  }

 
  onSubmitUpdate(){
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._libraryService.update(this.obj_category,this.id).subscribe(
      data => {
        //console.log("Updated Data",data);
        this._router.navigate(['library/add-category']);

      }
    );
    
  }

}
