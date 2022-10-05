import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/model/employee.model';
import { Leave } from 'src/app/model/leave.model';
import { Status } from 'src/app/model/status.model';
import { LibraryService } from 'src/app/service/library.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {

  id:string;
  d1 ;
  d2 ;
  name: string;
  employee: Employee;
  leaveData: Leave;
  statusData: Status;
  totalDays: number=0;
  startDate;
  endDate ;
  
  constructor(private libraryService: LibraryService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.name = localStorage.getItem('name');

    this.libraryService.searchEmployee(this.id).subscribe(data=>{
      this.employee = data
    });
    console.log(this.employee.id);
  }
  onFormSubmit(leaveForm: NgForm){
    let leave: Leave={
      startDate: leaveForm.value.startDate,
      endDate: leaveForm.value.endDate,
      days: this.totalDays,
      leaveType: leaveForm.value.leaveType,
      leaveReason: leaveForm.value.leaveReason
    }
    this.libraryService.addEmployeeLeave(leave).subscribe(data=>{
      this.leaveData = data;
    });
    let status: Status={
      name: this.name,
      startDate: leaveForm.value.startDate,
      endDate: leaveForm.value.endDate,
      days: this.totalDays,
      leaveType: leaveForm.value.leaveType,
      leaveReason: leaveForm.value.leaveReason,
      status: 'pending',
      employeeId: this.id
    }
    this.libraryService.postLeaveRequest(status).subscribe(data=>{
      this.statusData = data;
    });
    confirm("Are you sure do you want to submit?")
    // storing value in local storage
    localStorage.setItem('totalDays',String(this.totalDays));
  }
  diff(leaveForm: NgForm){
    this.startDate = leaveForm.value.startDate;
    this.endDate = leaveForm.value.endDate;
    this.d1 = new Date(this.startDate).getTime();
    this.d2 = new Date(this.endDate).getTime();
    this.totalDays = (this.d2 - this.d1)/86400000;
    // console.log(leaveForm.value.startDate);
    // console.log(leaveForm.value.endDate);
    // console.log(this.d1);
    // console.log(this.d2);
    // console.log(this.totalDays);
  }
  

}
