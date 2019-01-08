import { Component, OnInit } from '@angular/core';
import { switchMap} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray, isObject } from 'lodash';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { UtilsService } from '../../.././shared/services/utils.service';
import { EventService } from '../../../core/services/event.service';
import { Event } from '../../../core/classes/event/event';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: []
})
export class EventDetailComponent implements OnInit {
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

  event : Event =new Event();
   id:string;

  constructor(
	private _eventService: EventService,
    private _utils: UtilsService,
    private _routes:ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
     private _router:Router
  	) { }

  ngOnInit() {
  	 this.initEvent();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

 initEvent(){
 	 this._utils.unsubscribeSub(this._typeSub);
    this._sub = this._routes.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this._eventService.find(this.id);
      }))
      .subscribe(data => {
        if (isObject(data)) {
        this.event = data;
       
      }
     });
    }

    OnSubmitEventUpdate(){
    console.log("Data To Be Updated",this.event);
    console.log(this.id);
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._eventService.updateEvent(this.event,this.id)
      .subscribe(data => {
       this._router.navigate(['event/add-event']);
      });
 }
 }


