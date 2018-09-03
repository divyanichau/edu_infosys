import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';


import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';
import { AddBookComponent} from './add-book/add-book.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LibraryRoutingModule
  ],
  declarations: [LibraryComponent, AddBookComponent]
})
export class LibraryModule { }