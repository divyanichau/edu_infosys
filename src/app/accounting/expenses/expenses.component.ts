import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ExpenseService } from 'src/app/core/services/accounting/expense.service';
import { Subscription } from 'rxjs';
import { ExpenseType,DailyExpense } from 'src/app/core/classes/Accounting/expenses';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  // styleUrls:''
})
export class ExpensesComponent implements OnInit {
  private _sub: Subscription = undefined;
  
    _expenseCategories : ExpenseType[] 
    _dailyExpense : DailyExpense = new DailyExpense()
    _dailyExpense1 : DailyExpense = new DailyExpense()
    _dailyExpenses : DailyExpense[]
  selected_expenseCategory: any;
  expenseId_id: number;

  constructor(
    private _utils:UtilsService,
    private _expenseTypeService:ExpenseService
  ) { }

  ngOnInit() {
    this.initDailyExpense()
  }

  initExpenseCategory(){

    this._utils.unsubscribeSub(this._sub);
    this._sub = this._expenseTypeService.getExpenseCategy()
      .subscribe(data => {
        this._expenseCategories = data;
     
        this.selected_expenseCategory = this._expenseCategories[0].id
     
      });
 }

 initDailyExpense(){
  this._utils.unsubscribeSub(this._sub);
  this._sub = this._expenseTypeService.getDailyExpense()
    .subscribe(data => {
      this._dailyExpenses = data;
      this.initExpenseCategory()
   
    });
}

 onSubmitExpense(){
   this._dailyExpense.expense_type = this.selected_expenseCategory
      this._utils.unsubscribeSub(this._sub);
      this._sub = this._expenseTypeService.AddDailyExpense(this._dailyExpense)
        .subscribe(data => {
         this.initDailyExpense()
    
        });
 }

 OnRowClick(value:number){
  this.expenseId_id = value
  this._utils.unsubscribeSub(this._sub);
  this._sub = this._expenseTypeService.findDailyExpense(value)
    .subscribe(data => {
      this._dailyExpense1 = data;
    
     
    });

}
onSubmitExpenseUpdate(){
  this._dailyExpense1.expense_type = this.selected_expenseCategory
  console.log("expense for This Id",this._dailyExpense1)
  this._utils.unsubscribeSub(this._sub);
  this._sub = this._expenseTypeService.updateDailyExpense(this._dailyExpense1,this.expenseId_id)
    .subscribe(data => {
     this.initDailyExpense()

    });
}
}
