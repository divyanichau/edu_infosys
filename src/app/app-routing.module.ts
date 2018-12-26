import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
	 {
	    path: "",
	    component: DashboardComponent
	  },

	  {
	    path: "register",
	    component: RegisterComponent
	  },

	  {
	  	path: 'student',
	  	loadChildren: './student/student.module#StudentModule'
	  },
	  {
		path: 'academic',
		loadChildren: './academic/academic.module#AcademicModule'
	},

   //    {
	  // 	path: 'parent',
	  // 	loadChildren: './parent/parent.module#ParentModule'
	  // },

      {
	  	path: 'teacher',
	  	loadChildren: './teacher/teacher.module#TeacherModule'
	   },

	   {
	  	path: 'guardian',
	  	loadChildren: './guardian/guardian.module#GuardianModule'
	   },

	   {
	  	path: 'class',
	  	loadChildren: './class/class.module#ClassModule'
	   },

       {
	  	path: 'subject',
	  	loadChildren: './subject/subject.module#SubjectModule'
	   },

	   {
	   	path:'academic',
	   	loadChildren: './academic/academic.module#AcademicModule'
	   },


       // {
       // 	path: 'accounting',
       // 	loadChildren: './accounting/accounting.module#AccountingModule'
       // },

    //    {
	  	// path: 'library',
	  	// loadChildren: './library/library.module#LibraryModule'
	   // },

	];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
