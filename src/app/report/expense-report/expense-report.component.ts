import { Component, OnInit,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../shared/services/utils.service';
import {ExpenseReport} from '../../core/classes/expense-report';
import {ExpenseReportService} from '../../core/services/expensereport.service';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.css']
})
export class ExpenseReportComponent implements OnInit {
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  expense_report: ExpenseReport = new ExpenseReport();
  category:boolean =false;
  datewise:boolean =false;
  expensereport= false;
  rows:any[]=[];
  
  @ViewChild('expenseReport') public expenseReport:NgForm

  constructor(
    private _expensereportService:ExpenseReportService,
    private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService) { }

    onChange(newValue) {
      if(newValue == "category"){
        this.reset_report();
        this.category =true;
      }else if(newValue =="datewise"){
        console.log(newValue);
        this.reset_report();
        this.datewise =true;
      }else{
       this.reset_report();
       this.expensereport =false;
      }
     this.expenseReport.reset();
      
    }

    reset_report(){
      this.datewise =false;
      this.category =false;
    }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.expense_report)
    this._sub = this._expensereportService.get(this.expense_report)
     .subscribe(data => {
        console.log(data);
        this.rows = data;
        this.rows = [...this.rows];
       
      });

  }

  get_expensereport(){
   
    this.expensereport = true;
  }

}
