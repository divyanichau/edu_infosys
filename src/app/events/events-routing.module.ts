import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events.component';
import { EventTypesComponent } from './event-types/event-types.component';
import { AddEventComponent} from './add-event/add-event.component';
import { EventDetailComponent } from './add-event/event-detail/event-detail.component';

const routes: Routes = [

 {
    path: '',
    component: EventsComponent
    
  },

   {
    path: 'event-types',
    component: EventTypesComponent,
  },

  {
    path: 'add-event',
    component: AddEventComponent,
  },

   {
    path: 'edit-event/:id',
    component: EventDetailComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }