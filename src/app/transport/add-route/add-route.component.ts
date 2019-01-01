import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { _RouteService } from '../../core/services/_route.service';
import { _Route } from '../../core/classes/_route';
import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: []
})

export class AddRouteComponent implements OnInit {
  private _sub: Subscription = undefined;

  route: _Route = new _Route();


  constructor(
    private _routerService1: _RouteService,
    private _utils: UtilsService,
    private toastr: ToastrService,
    // private router: _Router
  ) { }


  ngOnInit() {

  }
  onSubmitRoute() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.route);
    this._sub = this._routerService1.AddRoute(this.route).subscribe(data => {
      console.log(data);
      this.toastr.success('Vehicle Added !', 'Success', { timeOut: 3000 });
    });
  }


}








