import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UtilsService } from '../shared/services/utils.service';

// import { LibraryService } from '../core/services/library.service';
// import { CourseService } from '../core/services/course.service';
// import { LibraryRoutingModule } from './library-routing.module';
// import { LibraryComponent } from './library.component';
// import { AddBookComponent} from './add-book/add-book.component';
// import { AddCategoryComponent} from './add-category/add-category.component';
// import { IssueBookComponent} from './issue-book/issue-book.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    NgxDatatableModule,

    //LibraryRoutingModule
  ],
  providers: [], //[LibraryService, CourseService, UtilsService],
  declarations: [], // [LibraryComponent, AddBookComponent, AddCategoryComponent, IssueBookComponent]
})
export class LibraryModule { }