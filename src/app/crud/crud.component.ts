import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  title = "EmployeeCURD";

  displayedColumns: string[] = ['employeeName', 'mailid', 'dob', 'gender','designation','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private dialog: MatDialog, private api: ApiService){}
  ngOnInit(): void {
    this.getAllEmployee();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:"35%"         
    }).afterClosed().subscribe(val=>{
      if(val === "save"){
        this.getAllEmployee();
      }
    })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;        
      },
      error:(err)=>{
        alert("Error while fetching the Records!")
      }
    })
  }
  editEmployee(row: any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === "update"){
        this.getAllEmployee();  
      }
    })
  }
  deleteEmployee(id:number){
    this.api.deleteEmployee(id)
    .subscribe({
      next:(res)=>{
        alert("Employee deleted Successfully!");
        this.getAllEmployee();
      },
      error:(err)=>{
        alert("Error while deleting employee");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  downloadReport(){
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const worksheet = XLSX.utils.json_to_sheet(this)
  }
}
