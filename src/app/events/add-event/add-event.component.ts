import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';


import{ DatatableComponent} from '@swimlane/ngx-datatable';
import { EventService } from '../../core/services/event.service';
import { TeacherService } from '../../core/services/teacher.service';
import { Teacher } from '../../core/classes/teacher';
import { Event } from '../../core/classes/event/event';
import { UtilsService } from '../../shared/services/utils.service';

declare var numeral: any;
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: []
})

export class AddEventComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

   // event : AddEvent =new AddEvent();
 
   _event : Event;
   events = [];
   _events: Event[];
   managers: Teacher[];

  selected_event: number;
  selected_manager: number;

  rows: any[] = [];
  temp: any[] = [];
  editing = {};

 @ViewChild(DatatableComponent) table: DatatableComponent;
   constructor(
    private _eventService: EventService,
    private teacherService: TeacherService,
   	private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService
    ) { }

   ngOnInit() {
      this.initEvent();
      this.loadEvents();
   	}

   	ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

   OnSubmitEvent() {
      console.log("gfgf",this.selected_event);
      this._event.type=this.selected_event;
      this._event.manager=this.selected_manager;
    this._utils.unsubscribeSub(this._sub);
     //this._event.event=this.selected_event;
   console.log("fcrcr",this._event)
    this._sub = this._eventService.addEvent(this._event)
      .subscribe(data => {
        //console.log(data);
         this.toastr.success('Event Added !', 'Success',{timeOut: 3000});

      });
  }

   loadEvents() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._eventService.get().subscribe(
      data => {
        isArray(data) ? this.events = data : data;
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

 initEvent() {
    this._utils.unsubscribeSub(this._typeSub);
      this._sub = this._eventService.getEvent().subscribe(
      data => {
        isArray(data) ? this.events = data : data;
        this.rows = this.events;
        this.temp = [...this.events];
      }
      
    );
    this._event= new Event();

  }
}


