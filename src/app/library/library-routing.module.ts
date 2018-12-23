import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryComponent } from './library.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddCategoryComponent} from './add-category/add-category.component';
import { IssueBookComponent} from './issue-book/issue-book.component';

const routes: Routes = [

{
	  path: "",
	    component: LibraryComponent
}, 
      
	 {
	    path: "add-book",
	    component:AddBookComponent,	    
	  },

	   {
	    path: "add-category",
	    component:AddCategoryComponent,	   	    
	  },

	   {
	    path: "issue-book",
	    component:IssueBookComponent,	    
	  },
	 
	];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
