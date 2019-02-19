import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import {InventoryItemComponent} from './inventory-item/inventory-item.component';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent
    
  },

  
  {
    path: 'inventory-item',
    component: InventoryItemComponent,
  },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StoreRoutingModule { }
