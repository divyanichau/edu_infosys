import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountingComponent } from './accounting.component';
// import { LoginComponent}  from './login/login.component';
// import { DashboardComponent } from './Dashboard/dashboard.component';
// import { PaymentComponent} from './payment/payment.component';
// import { ExpenseComponent} from'./expense/expense.component';
// import { StudentComponent} from './student/student.component';
// import { ListComponent} from './student/list/list.component';
// import { TeacherComponent} from './teacher/teacher.component';
// import { AddCategoryComponent} from './add-category/add-category.component';
// import { ReportComponent} from './report/report.component';
// import { SssComponent} from './sss/sss.component';
import { ClassComponent} from './class/class.component';
import { SectionComponent} from './section/section.component';
import { AddStudentComponent} from './add-student/add-student.component'
import { SubjectComponent} from './subject/subject.component'
import { CourseComponent} from './course/course.component'


const routes: Routes = [

{
	  path: "",
	    component: AccountingComponent
}, 
  //      {
	 //    path: "LoginComponent",
	 //    component:AccountingComponent,
	 //    children: [
	 //    	{path: '', component: LoginComponent}
	    
	 //    ]
	    
	 //  },

	 // {
	 //    path: "Dashboard",
	 //    component:AccountingComponent,
	 //    children: [
	 //    	{path: '', component: DashboardComponent}
	    
	 //    ]
	    
	 //  },


	 //   {
	 //    path: "payment",
	 //    component:AccountingComponent,
	 //    children: [
	 //    	{path: '', component: PaymentComponent, }
	    
	 //    ]
	    
	 //  },

	 
  //     {
	 //    path: "expense",
	 //    component:AccountingComponent,
	 //    children: [
	 //    	{path: '', component: ExpenseComponent}
	    
	 //    ]
	    
	 //  },
	  
	 //  {
	 //    path: "student",
	 //    component:AccountingComponent,
	 //    children: [
	 //    	{path: '', component: StudentComponent},
	 //    	{path: 'list', component: ListComponent}
	    
	 //    ]
	    
	 //  },
  
   // {
	  //   path: "student/list",
	  //   component:AccountingComponent,
	  //   children: [
	  //   	{path: '', component: ListComponent}
	    
	  //   ]
	    
	  // },
  


	   {
	    path: "class",
	    component:AccountingComponent,
	    children: [
	    	{path: '', component: ClassComponent}
	    
	    ]
	    
	  },

	   {
	    path: "section",
	    component:AccountingComponent,
	    children: [
	    	{path: '', component: SectionComponent}
	    
	    ]
	    
	  },
    
     {
	    path: "add-student",
	    component:AccountingComponent,
	    children: [
	    	{path: '', component: AddStudentComponent}
	    
	    ]
	    
	  },


     {
	    path: "course",
	    component:AccountingComponent,
	    children: [
	    	{path: '', component: CourseComponent}
	    
	    ]
	    
	  },

	   {
	    path: "subject",
	    component:AccountingComponent,
	    children: [
	    	{path: '', component: SubjectComponent}
	    
	    ]
	    
	  }

	 //   {
	 //    path: "teacher",
	 //    component:AccountingComponent,
	 //    children: [
	 //    	{path: '', component: TeacherComponent}
	    
	 //    ]
	    
	 //  },

  //   {
	 //    path: "add-category",
	 //    component:AccountingComponent,
	 //    children: [
	 //    	{path: '', component: AddCategoryComponent}
	    
	 //    ]
	    
	 //  },
	  
	 // {
	 //    path: "report",
	 //    component:AccountingComponent,
	 //    children: [
	 //    	{path: '', component: ReportComponent}
	    
	 //    ]
	    
	 //  },

	 //  {
	 //    path: "sss",
	 //    component:AccountingComponent,
	 //    children: [
	 //    	{path: '', component: SssComponent}
	    
	 //    ]
	    
	 //  }
	  
	 

	];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
