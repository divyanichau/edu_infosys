import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/operators';
import { ExpenseType,ExpenseTypeUpdate } from '../../../core/classes/Accounting/expenses';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ExpenseService } from 'src/app/core/services/accounting/expense.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';




@Component({
  selector: 'app-expense-type',
  templateUrl: './expense-type.component.html',
  styleUrls: []
})
export class ExpenseTypeComponent implements OnInit {
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  
    totlTerm : any[] = []
    _expenseType : ExpenseType = new ExpenseType()
    _expenseCategories : ExpenseType[]
    // _expenseCategories1 : ExpenseTypeUpdate[]
    _expenseCategories1 : any[] = []
  expenseType_id: number;
 

  constructor(
    private _utils:UtilsService,
    private _expenseTypeService:ExpenseService
  ) { }

  ngOnInit() {
    this.initExpenseCategory()
  }
  initExpenseCategory(){
     this._utils.unsubscribeSub(this._sub);
     this._sub = this._expenseTypeService.getExpenseCategy()
       .subscribe(data => {
         this._expenseCategories = data;
       });
  }
  onSubmitExpenseType(){
    //console.log(this._expenseType)
      this._utils.unsubscribeSub(this._sub);
      this._sub = this._expenseTypeService.AddExpenseType(this._expenseType)
        .subscribe(data => {
          // console.log(data);
          // alert('guardian added');
          this.initExpenseCategory()
        });
  }

  OnRowClick(value:number){
    this.expenseType_id = value
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._expenseTypeService.findExpenseCategy(value)
      .subscribe(data => {
        this._expenseCategories1 = data;
        // console.log(this._expenseCategories1)
       
      });

  }
  ExpenseTypeUpdate(){
     this._utils.unsubscribeSub(this._sub);
    this._sub = this._expenseTypeService.updateExpenseType(this._expenseCategories1,this.expenseType_id)
      .subscribe(data => {
        
        this.initExpenseCategory()
      });
  }

}
