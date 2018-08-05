import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentRoutingModule } from './parent-routing.module';
import { ParentComponent } from './parent.component';
import { AddComponent} from './add/add.component';
import { ListComponent} from './list/list.component';
import { EditComponent} from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    ParentRoutingModule
  ],
  declarations: [ParentComponent, AddComponent, ListComponent, EditComponent]
})
export class ParentModule { }