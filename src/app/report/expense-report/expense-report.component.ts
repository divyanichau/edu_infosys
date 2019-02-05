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
  default_detail_type={1:false , 2:false};
  detail_type=this.default_detail_type;
  expensereport= false;
  rows:any[]=[];
  @ViewChild('expenseReport') public expenseReport:NgForm;

  reset_details_value(){
    this.detail_type = this.default_detail_type;
    this.detail_type[1]=false;
    this.detail_type[2]=false;
  }

  constructor(
    private _expensereportService:ExpenseReportService,
    private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService) { }

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

  onChange(newValue) {
    this.reset_details_value();

    this.detail_type[newValue] = true;
   this.expenseReport.reset();
    
  }

  get_expensereport(){
   
    this.expensereport = true;
  }

}
