import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  constructor(private formbuilder : FormBuilder, 
              private api : ApiService, 
              private dialogRef : MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any){}
  
  
  employeeForm !: FormGroup;
  actionBtn : string = 'Save';

  ngOnInit(): void{
    this.employeeForm = this.formbuilder.group({
      employeeName : ['',Validators.required],
      mailid : ['',Validators.email],
      dob : ['',Validators.required],
      gender : ['',Validators.required],
      designation : ['',Validators.required]
    })
    if(this.editData){
      this.actionBtn = "Update";
      this.employeeForm.controls['employeeName'].setValue(this.editData.employeeName);
      this.employeeForm.controls['mailid'].setValue(this.editData.mailid);
      this.employeeForm.controls['dob'].setValue(this.editData.dob);
      this.employeeForm.controls['gender'].setValue(this.editData.gender);
      this.employeeForm.controls['designation'].setValue(this.editData.designation);
    }
  }
  addEmployee(){
    if(!this.editData){
      if(this.employeeForm.valid){
        this.api.postEmployee(this.employeeForm.value)
        .subscribe({
          next:(res)=>{
            alert("Employee added Successfully");            
            this.employeeForm.reset();
            this.dialogRef.close();          
          },
          error:()=>{
            alert("Some error occured!")
          }
        })
      }
    }else{
      this.updateEmployee();
    }
  }
  updateEmployee(){
    this.api.putEmployee(this.employeeForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Empoyee Details updated successfully!");
        this.employeeForm.reset();
        this.dialogRef.close('update');
      },
      error:(err)=>{
        alert("Error while updating the record");
      }
    })
  }
}
