import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddRouteComponent } from './add-route/add-route.component';
import { AllocateTransportComponent } from './allocate-transport/allocate-transport.component';

const routes: Routes = [
  {
    path:'add_vehicle',
    component:AddVehicleComponent
  },
  {
    path:'add_route',
    component:AddRouteComponent
  },
  {
    path:'allocate_transport',
    component:AllocateTransportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
