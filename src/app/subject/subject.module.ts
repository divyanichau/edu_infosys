import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './subject.component';
import { AddComponent} from './add/add.component';
import { ListComponent} from './list/list.component';
import { EditComponent} from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    SubjectRoutingModule
  ],
  declarations: [SubjectComponent, AddComponent, ListComponent, EditComponent]
})
export class SubjectModule { }