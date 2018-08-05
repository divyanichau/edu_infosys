import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
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
	    path: "login",
	    component: LoginComponent
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
	  	path: 'parent',
	  	loadChildren: './parent/parent.module#ParentModule'
	  },

      {
	  	path: 'teacher',
	  	loadChildren: './teacher/teacher.module#TeacherModule'
	   },

       {
	  	path: 'subject',
	  	loadChildren: './subject/subject.module#SubjectModule'
	   }, 

	    {
	  	path: 'transport',
	  	loadChildren: './transport/transport.module#TransportModule'
	   }, 

       {
	  	path: 'class',
	  	loadChildren: './class/manage classes.module#ClassModule'
	   }, 


	];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
