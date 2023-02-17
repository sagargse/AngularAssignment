import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import * as XLSX from 'xlsx';

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
  fileName= 'EmployeeReport.xlsx';
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }
}
