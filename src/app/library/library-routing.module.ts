import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryComponent } from './library.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddCategoryComponent} from './add-category/add-category.component';
import { IssueBookComponent} from './issue-book/issue-book.component';
import { BookReturnComponent} from './book-return/book-return.component';
import { DetailComponent} from './add-category/detail/detail.component';
import { ReportComponent} from './report/report.component';

const routes: Routes = [

{
	  path: "",
	    component: LibraryComponent
}, 
      
	 {
	    path: "add-book",
	    component:AddBookComponent	    
	  },

	   {
	    path: "add-category",
	    component:AddCategoryComponent	   	    
	  },

	   {
	    path: "add-category/detail/:id",
	    component:DetailComponent	   	    
	  },

	   {
	    path: "issue-book",
	    component:IssueBookComponent	    
	  },

	   {
	    path: "book-return",
	    component:BookReturnComponent	    
	  },

	   {
	    path: "report",
	    component:ReportComponent	    
	  }
	 
	];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
