import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Employee } from 'src/app/shared/employee';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
//assign default page number
page:number =1;
filter : string;
  constructor(public empService:EmployeeService,private toxterService: ToastrService) { }

  ngOnInit(): void {
    this.empService.bindEmployee();
  }
  //populate form by clicking the column fields
  populateForm(emp:Employee){
    console.log(emp);
    //date format
    var datePipe = new DatePipe("en-UK");
    let formatedDate:any = datePipe.transform(emp.DateOfJoining,'yyyy-MM-dd');
    emp.DateOfJoining = formatedDate;
    this.empService.formData =Object.assign({},emp); 
  }

  //delete employee
  deleteEmployee(id:number){
    

  console.log("Deleting a record...");
  if(confirm('Are you sure to Delete this reord')) {
    this.empService.deleteEmployee(id).subscribe(
      (result)=>
      {
        console.log("result"+result);
        //this.empService.bindEmployee();
        this.toxterService.success('Employee details Updated!', 'succes!');
        
      }, (error) =>{
        console.log(error);
      }
    );
    window.location.reload();
  }
  
  

  }
}
