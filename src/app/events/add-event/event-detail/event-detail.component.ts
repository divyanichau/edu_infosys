import { Component, OnInit } from '@angular/core';
import { switchMap} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray, isObject } from 'lodash';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { UtilsService } from '../../.././shared/services/utils.service';
import { EventService } from '../../../core/services/event.service';
import { TeacherService } from '../../../core/services/teacher.service';
import { Event, EventType } from '../../../core/classes/event/event';
import { Teacher } from '../../../core/classes/teacher';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: []
})
export class EventDetailComponent implements OnInit {
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

  _event : Event =new Event();
  events :EventType[];
    _events: Event[];
  managers: Teacher[];

  selected_event: number;
  selected_manager: number;
   id:string;

  constructor(
	  private _eventService: EventService,
    private teacherService:TeacherService,
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
        this._event = data;
      }
       this.loadEventTypes();
     });
    }

     loadEventTypes() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._eventService.get().subscribe(
      data => {
       
        isArray(data) ? this.events = data : data;
        this.selected_event = this.events[0].id;
         this.loadManager();
    });
       // if(this.event.length > 0){
         // this.selected_event = this.events[0].id;
         
        }

    loadManager() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this.teacherService.get().subscribe(
      data => {
        isArray(data) ? this.managers = data : data;
        this.selected_manager = this.managers[0].id;
      
      }
    );
  }


    OnSubmitEventUpdate(){
   
    this._event.type=this.selected_event;
    this._event.manager=this.selected_manager;
    console.log("Data To Be Updated",this.selected_event);
    //console.log(this.id);
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._eventService.updateEvent(this._event,this.id)
      .subscribe(data => {
       this._router.navigate(['/event/add-event']);
      });
 }

 }


