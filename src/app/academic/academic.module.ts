import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicRoutingModule } from './academic-routing.module';
import { CreateComponent } from './certification/create/create.component';

@NgModule({
  imports: [
    CommonModule,
    AcademicRoutingModule
  ],
  declarations: [CreateComponent]
})
export class AcademicModule { }
