import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { UtilsService } from '../../shared/services/utils.service';
import { FeepaidReport } from '../../core/classes/feepaid-report';
import { FeepaidReportService } from '../../core/services/feepaidreport.service';

@Component({
  selector: 'app-feepaid-report',
  templateUrl: './feepaid-report.component.html',
  styleUrls: ['./feepaid-report.component.css']
})
export class FeepaidReportComponent implements OnInit {
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  default_cheque_type = {0:false, 1:false,2:false};
  cheque_type = this.default_cheque_type;

  feepaid_report: FeepaidReport = new FeepaidReport();
  paidreport =false;
  collectivereport =false;
  monthlyreport =false;


  onChange(newvalue){
    this.reset_cheques_value();
    this.cheque_type[newvalue] =true;
    
  }
  reset_cheques_value(){
    this.cheque_type =this.default_cheque_type;
    this.cheque_type[0]=false;
    this.cheque_type[1] =false;
    this.cheque_type[2]= false;
  }

  constructor( 
    private _utils: UtilsService,
    private router: Router,
    private _feepaidreportService: FeepaidReportService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.reset_cheques_value;
    this.cheque_type[0] =true;
  }

  get_paidreport(){
    this.paidreport = true;
  }
  get_collectivereport(){
    this.collectivereport =true;
  }
  get_monthlyreport(){
    this.monthlyreport = true;
  }

 

}
