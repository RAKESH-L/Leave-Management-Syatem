import { Component, OnInit } from '@angular/core';
import { DataRequest } from 'src/app/model/Approve-deny.model';
import { Employee } from 'src/app/model/employee.model';
import { Status } from 'src/app/model/status.model';
import { LibraryService } from 'src/app/service/library.service';

@Component({
  selector: 'app-approve-deny',
  templateUrl: './approve-deny.component.html',
  styleUrls: ['./approve-deny.component.css']
})
export class ApproveDenyComponent implements OnInit {

  id: string;
  employeeId: string;
  totalDays: string;
  employee: Employee;
  statusArry: Status[];
  approve: DataRequest;
  denied: DataRequest;
  total: number=0;
  number: number;
  constructor(private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.libraryService.getAllEmployeeStatus().subscribe(data=>{
      this.statusArry = data;
    });
    // geting stored data from apply-leave components
    this.totalDays = localStorage.getItem('totalDays');
    // converting string to number
    this.number = Number(this.totalDays);
  }
  approveRequest(id: string, employeeId: string){
    let request: DataRequest={
      status: 'Approved'
    }
    this.libraryService.ApproveRequest(id, request).subscribe(data=>{
      this.approve = data;
    });
    // searching record using employee id
    this.libraryService.searchEmployee(employeeId).subscribe(data=>{
      this.employee = data;
    });
    confirm("Do you want to Approve the request?");
    // calculating Leave Balance
    this.total = this.employee.leaveBalance - this.number;
    let update: Employee={
      leaveBalance: this.total
    }
    // updating Leave Balance
    this.libraryService.updateEmployee(this.employee.id, update).subscribe(data=>{
      this.employee = data;
    })
    console.log(this.number);
    console.log(this.employee.leaveBalance);
    console.log(this.total);
  }
  denyRequest(id: string){
    let request: DataRequest={
      status: 'Denied'
    }
    this.libraryService.DeniedRequest(id, request).subscribe(data=>{
      this.denied = data;
    });
    confirm("Do you want to Deny the request?")
  }

}
