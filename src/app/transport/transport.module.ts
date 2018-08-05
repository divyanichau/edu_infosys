import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportRoutingModule } from './transport-routing.module';
import { TransportComponent } from './transport.component';
import { AddComponent} from './add/add.component';
import { EditComponent} from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    TransportRoutingModule
  ],
  declarations: [TransportComponent, AddComponent,  EditComponent]
})
export class TransportModule { }
