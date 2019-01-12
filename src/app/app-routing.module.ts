import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
//import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
	 {
	    path: "",
	    loadChildren: './dashboard/dashboard.module#DashboardModule'
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
	{
		path:'setting',
		loadChildren:'./setting/setting.module#SettingModule'
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
	   	path:'academic',
	   	loadChildren: './academic/academic.module#AcademicModule'
	   },


       // {
       // 	path: 'accounting',
       // 	loadChildren: './accounting/accounting.module#AccountingModule'
       // },

       {
	  	path: 'library',
	  	loadChildren: './library/library.module#LibraryModule'
	   },
	   {
		   path:'transport',
		   loadChildren:'./transport/transport.module#TransportModule'
	   },
	   {
	    path: "exam",
	    loadChildren: './exams/exams.module#ExamsModule'
	  },

	  {
	    path: "report",
	    loadChildren: './report/report.module#ReportModule'
	  },

	   {
	  	path: 'events',
	  	loadChildren: './events/events.module#EventsModule'
	  },

      {
	  	path: 'task',
	   	loadChildren: './task/task.module#TaskModule'
	  },


	];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
