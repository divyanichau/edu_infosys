import {switchMap} from 'rxjs/operators';
import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { isArray, isObject } from 'lodash';

import { _Route } from '../../core/classes/_route';
import { UtilsService } from '../../shared/services/utils.service';
import { _RouteService } from '../../core/services/_route.service';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.css']

})
export class EditRouteComponent implements OnInit {

  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  route: _Route = new _Route();
  id: string;

  constructor(
    private _routes: ActivatedRoute,
   
    private _utils: UtilsService,
    private router: Router,
    private _routerService:_RouteService
  ) { }

  ngOnInit() {
    this.initRoute();
  }

  initRoute() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._routes.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this._routerService.find(this.id);
      }))
      .subscribe(data => {
        if (isObject(data)) {
          this.route = data;
          console.log(this.route);
        }
      });

  }
  onSubmitUpdateRoute(){
    // console.log(this.id)
    // console.log(this.route);
    //this.route.id=this.id;
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._routerService.update(this.route,this.id)
      .subscribe(data => {
        // console.log(data);
        // alert('student Updated');
        this.router.navigate(['/transport/add_route']);
      });
  }
}
