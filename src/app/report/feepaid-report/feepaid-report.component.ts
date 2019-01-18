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
  feepaid_report: FeepaidReport = new FeepaidReport();
  paidreport:boolean =false;
  collectivereport =false;
  monthlyreport =false;
 

  constructor( 
    private _utils: UtilsService,
    private router: Router,
    private _feepaidreportService: FeepaidReportService,
    private toastr: ToastrService) { }

  ngOnInit() {
    
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
