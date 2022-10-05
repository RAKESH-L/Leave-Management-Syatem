import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AllEmployeeComponent } from './components/all-employee/all-employee.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { ApproveDenyComponent } from './components/approve-deny/approve-deny.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StatusComponent } from './components/status/status.component';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AddEmployeeComponent,
    AllEmployeeComponent,
    ApplyLeaveComponent,
    ApproveDenyComponent,
    PageNotFoundComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
