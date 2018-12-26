import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { Config } from './shared/classes/app';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// import { AcademicComponent } from './academic/academic.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SidebarComponent,
    TopbarComponent,
    DashboardComponent,
    
   
  
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    
    //AngularSlickgridModule.forRoot(),  
  ],
  providers: [Config],
  bootstrap: [AppComponent]
})
export class AppModule { }
