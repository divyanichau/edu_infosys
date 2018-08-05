import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { AddComponent} from './add/add.component';
import { ListComponent} from './list/list.component';
import { EditComponent} from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    TeacherRoutingModule
  ],
  declarations: [TeacherComponent, AddComponent, ListComponent, EditComponent]
})
export class TeacherModule { }