import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { UtilsService } from '../shared/services/utils.service';

import { LibraryService } from '../core/services/library.service';
import { BatchService } from '../core/services/batch.service';
import { StudentService } from '../core/services/student.service';
import { CourseService } from '../core/services/course.service';
import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';

import { AddBookComponent} from './add-book/add-book.component';
import { AddCategoryComponent} from './add-category/add-category.component';
import { IssueBookComponent} from './issue-book/issue-book.component';
import { BookReturnComponent} from './book-return/book-return.component';
import { DetailComponent} from './add-category/detail/detail.component';
import { ReportComponent} from './report/report.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgxDatatableModule,
    NgxTypeaheadModule,

    LibraryRoutingModule
  ],
  providers: [LibraryService, CourseService, BatchService, StudentService, UtilsService],
  declarations: [LibraryComponent, ReportComponent, AddBookComponent, DetailComponent, AddCategoryComponent, BookReturnComponent, IssueBookComponent]
})
export class LibraryModule { }