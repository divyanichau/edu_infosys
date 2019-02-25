import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ExpenseService } from 'src/app/core/services/accounting/expense.service';
import { Subscription } from 'rxjs';
import { ExpenseType,DailyExpense,ExpenseSelection,SelectType } from 'src/app/core/classes/Accounting/expenses';
import { ElementFinder } from 'protractor';
import { NgForm } from '@angular/forms';
import { AngularCsv } from 'angular7-csv';

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
    _filtered_data :ExpenseSelection = new ExpenseSelection()
    _select_type :SelectType = new SelectType()
    _dailyExpenses : DailyExpense[]
  selected_expenseCategory: any;
  select_type : number
  expenseId_id: number;
  boo1: boolean;
  boo2: boolean;
 date:Date
  constructor(
    private _utils:UtilsService,
    private _expenseTypeService:ExpenseService
  ) { }
  // @ViewChild(NgForm) myForm: NgForm;

  ngOnInit() {
    this.initExpenseCategory()
    this._select_type.select_type = 0
    this._filtered_data.select_type = 0
    this.date =  new Date();
    // alert(this.date)
    
    // this._filtered_data.expense_category = this.select_type
  }
  // clearValues() {
  //   this.myForm.resetForm();
  // }

  initExpenseCategory(){

    this._utils.unsubscribeSub(this._sub);
    this._sub = this._expenseTypeService.getExpenseCategy()
      .subscribe(data => {
        this._expenseCategories = data;
     
        this.selected_expenseCategory = this._expenseCategories[0].id
        this.initDailyExpense()
      });
 }

 initDailyExpense(){
  this._utils.unsubscribeSub(this._sub);
  
  console.log(this._filtered_data)
  this._sub = this._expenseTypeService.getDailyExpense(this._filtered_data)
    .subscribe(data => {
      this._dailyExpenses = data;
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
  // console.log("expense for This Id",this._dailyExpense1)
  this._utils.unsubscribeSub(this._sub);
  this._sub = this._expenseTypeService.updateDailyExpense(this._dailyExpense1,this.expenseId_id)
    .subscribe(data => {
     this.initDailyExpense()

    });
}

selectOption(id: number) {
  if(id == 0){
    this.boo1 = false
    this.boo2 = false
    // this.select_type = id
    this._filtered_data.expense_category = this.select_type
    // this._filtered_data.select_type = this.select_type
   
  }
  else if(id==1){
    this.boo1 = true
    this.boo2 = false
    this._filtered_data.expense_category = this.selected_expenseCategory
  }

  else{
    this.boo1 = false
    this.boo2 = true
    this._filtered_data.expense_category = this.select_type
  }
  this.initDailyExpense()
 
}
CategoryChange(id :number){
  // console.log(id)
  this.selected_expenseCategory = id
  this._filtered_data.expense_category = this.selected_expenseCategory
  this.initDailyExpense()
}

LoadExpenseWithDate(){
  this.initDailyExpense()
}
// ClearFormData(){
//   this.form_name.reset();
// }
newHero(){
  let val:number = 0
  this._filtered_data.select_type == val
  console.log(this._filtered_data.select_type)
  this.initDailyExpense()
}

exportCsv(){
  const header = Object.keys(this._dailyExpenses[0])
  var options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    headers: header,
    // showTitle: true,
    // useBom: true,
    removeNewLines: false,
    keys: []
  };
  return new AngularCsv(this._dailyExpenses,'this.date',options)
}
}
