import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { isArray ,isObject} from 'lodash';

import { UtilsService } from '../../../shared/services/utils.service';
import { LibraryService } from '../../../core/services/library.service';
import { AddBook } from '../../../core/classes/addbook';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',

})
export class EditBookComponent implements OnInit {
  private _sub: Subscription = undefined;
   id: string;
   add_book : AddBook = new AddBook();
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
        return this._libraryService.find(this.id);
      }))
      .subscribe(data => {
        if (isObject(data)) {
         console.log("vhgv",data);
         //this.add_book = data;
        console.log("Edit Book",this.add_book);
        }
      });
  }

 
  onSubmitEditUpdate(){
    console.log(this.id);
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._libraryService.updateBook(this.add_book,this.id).subscribe(
      data => {
        //console.log("Updated Data",data);
        this._router.navigate(['library/add-book']);

      }
    );
    
  }

}
