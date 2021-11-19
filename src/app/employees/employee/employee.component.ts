import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public empService: EmployeeService,private toxterService: ToastrService) { }

  ngOnInit(): void {

    this.resetform();
    this.empService.bindCmdDepartment();
  }
  onSubmit(form: NgForm) {

    console.log(form.value);
    let addId=this.empService.formData.EmployeeId;
//insert

if(addId==0||addId==null)
{
  this.insertEmployee(form);
  //window.location.reload();

}
//update
else{

  console.log("update");
  this.updateEmployee(form);

}

  }

  //clear all content at initialisation

  resetform(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }

//insert employee
insertEmployee(form?:NgForm)
{
  console.log("inserting employee...")
  this.empService.insertEmployee(form.value).subscribe(
    (result)=>
    {
      console.log("result"+result);
      this.resetform(form);
      this.toxterService.success('Employee details Inserted!', 'succes!');
    }
  );
  window.location.reload();
}
//update employee

updateEmployee(form?:NgForm)
{
  console.log("updating employee...")
  this.empService.updateEmployee(form.value).subscribe(
    (result)=>
    {
      console.log("result"+result);
      this.resetform(form);
      this.toxterService.success('Employee details Updated!', 'succes!');
      
    }
  );
  window.location.reload();
}
}


