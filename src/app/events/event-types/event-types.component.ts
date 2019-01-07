import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';


import{ DatatableComponent} from '@swimlane/ngx-datatable';
import { EventService } from '../../core/services/event.service';
import { Event } from '../../core/classes/event/event';
import { UtilsService } from '../../shared/services/utils.service';

declare var numeral: any;
@Component({
  selector: 'app-events',
  templateUrl: './event-types.component.html',
  styleUrls: []
})

export class EventTypesComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
   _event : Event;
   events = [];


  rows: any[] = [];
  temp: any[] = [];
  editing = {};

 @ViewChild(DatatableComponent) table: DatatableComponent;
   constructor(
    private _eventService: EventService,
   	private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService
    ) { }

   ngOnInit() {
      this.initEvent();
   	}

   	ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

   OnSubmitEvent() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this._event)
    this._sub = this._eventService.add(this._event)
      .subscribe(data => {
        console.log(data);
         this.toastr.success('Event Types Added !', 'Success',{timeOut: 3000});

      });
  }

 initEvent() {
    this._utils.unsubscribeSub(this._typeSub);
      this._sub = this._eventService.get().subscribe(
      data => {
        isArray(data) ? this.events = data : data;
        this.rows = this.events;
        this.temp = [...this.events];
      }
      
    );
    this._event= new Event();

  }


}