import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UtilsService } from '../shared/services/utils.service';
import { DashboardService } from '../core/services/dashboard.service';
import { StatDashboard } from '../core/classes/stat/dashboard';




@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  stat: StatDashboard = new StatDashboard();

  constructor(
    private _dashboardService: DashboardService,
    private _utils: UtilsService
  ) { }

  ngOnInit() {
  	this.initStats();
  	this._dashboardService.stat.subscribe(data => { 
  		this.stat = data;
  	})
    
  }

  initStats(){
  	this._utils.unsubscribeSub(this._sub);
  	this._sub = this._dashboardService.getStat().subscribe(
      data => {
        this.stat = data;
        this._dashboardService.updateStat(this.stat)

      }
    );
  }

}
