import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { AddComponent} from './add/add.component';
import { ListComponent} from './list/list.component';
import { EditComponent} from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule
  ],
  declarations: [StudentComponent, AddComponent, ListComponent, EditComponent]
})
export class StudentModule { }