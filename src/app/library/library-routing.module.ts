import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryComponent } from './library.component';
import { AddBookComponent } from './add-book/add-book.component';

const routes: Routes = [

{
	  path: "",
	    component: LibraryComponent
}, 
      
	 {
	    path: "add-book",
	    component:LibraryComponent,
	    children: [
	    	{path: '', component: AddBookComponent}
	    
	    ]
	    
	  }
	 
	];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
