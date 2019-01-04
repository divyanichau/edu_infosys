import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgProgressModule } from '@ngx-progressbar/core';


import { UtilsService } from './shared/services/utils.service';
import { DashboardService } from './core/services/dashboard.service';

import { Config } from './shared/classes/app';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';


// import { AcademicComponent } from './academic/academic.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SidebarComponent,
    TopbarComponent,
    //DashboardComponent,
  
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgProgressModule.withConfig({
      spinnerPosition: 'left',
      color: 'red'
    }),
    AppRoutingModule,

  ],
  providers: [Config, UtilsService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
