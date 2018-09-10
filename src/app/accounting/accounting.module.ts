import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';

import { SectionService } from '../core/services/section.service';
import { ClassService } from '../core/services/class.service';
import { StudentService } from '../core/services/student.service';
import { UtilsService } from '../shared/services/utils.service';


import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';
import { LoginComponent} from './login/login.component';
import { DashboardComponent} from './Dashboard/dashboard.component';
import { PaymentComponent} from './payment/payment.component';
import { ExpenseComponent} from './expense/expense.component';
import { StudentComponent} from './student/student.component';
import { ListComponent} from './student/list/list.component';
import { TeacherComponent} from './teacher/teacher.component';
import { AddCategoryComponent} from './add-category/add-category.component';
import { ReportComponent} from './report/report.component';
import { SssComponent} from './sss/sss.component';
import { ClassComponent} from './class/class.component';
import { SectionComponent} from './section/section.component';
import { AddStudentComponent} from './add-student/add-student.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    AccountingRoutingModule
  ],
  providers: [StudentService, ClassService, SectionService, UtilsService],
  declarations: [AccountingComponent, DashboardComponent, LoginComponent, PaymentComponent, ExpenseComponent, StudentComponent, ListComponent, ClassComponent, SectionComponent,  TeacherComponent, AddCategoryComponent, ReportComponent, SssComponent, AddStudentComponent]
})
export class AccountingModule { }