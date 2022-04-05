import { Component, OnInit, ViewChild } from '@angular/core';

import { EmployeeService } from 'src/app/services/employee.service';
import { DepartmentService } from 'src/app/services/department.service';
import { EpmloyeeComponent } from '../epmloyee/epmloyee.component';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  constructor(
    private service: EmployeeService, 
    private deptService: DepartmentService, 
    private dialog: MatDialog,
    ) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  listData!: MatTableDataSource<any>;
  displayDataColumns: string[] = ['fullName', 'email', 'deptName', 'mobile', 'city','action'];
  searchKey!: string

  ngOnInit(): void {
    this.service.getEmpList()
      .subscribe(
        list => {
          let array = list
            .map(
              item => {
                let deptName = this.deptService.getdeptName(item.payload.val()['department'])
                return {
                  $key: item.key,
                  deptName,
                  ...item.payload.val() 
                };
              });
              console.table(array);
          this.listData = new MatTableDataSource(array)
          this.listData.sort = this.sort
          this.listData.paginator = this.paginator
        }
      );
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter()
  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.onInitialize();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EpmloyeeComponent, dialogConfig)
  }

  onEdit(row: any) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EpmloyeeComponent, dialogConfig)
  }
}
