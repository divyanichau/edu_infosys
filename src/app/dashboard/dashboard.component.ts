import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UtilsService } from '../shared/services/utils.service';
import { DashboardService } from '../core/services/dashboard.service';
import { StatDashboard } from '../core/classes/stat/dashboard';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  stat: StatDashboard = new StatDashboard();

  constructor(
    private _dashboardService: DashboardService,
    private _utils: UtilsService
  ) { }

  ngOnInit() {

    this._dashboardService.stat.subscribe(data => {
      this.stat = data;
    })
  }


}
