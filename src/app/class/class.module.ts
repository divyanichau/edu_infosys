import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassRoutingModule } from './class-routing.module';
import { ClassComponent } from './class.component';
import { AddComponent} from './add/add.component';

@NgModule({
  imports: [
    CommonModule,
    ClassRoutingModule
  ],
  declarations: [ClassComponent, AddComponent]
})
export class ClassModule { }