import { Component, OnInit } from '@angular/core';

import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/services/notification.service';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-epmloyee',
  templateUrl: './epmloyee.component.html',
  styleUrls: ['./epmloyee.component.scss'],
})

export class EpmloyeeComponent implements OnInit {
  btnName: string = ""
  constructor(
    public service: EmployeeService,
    public deptService: DepartmentService,
    private notification: NotificationService,
    public dialogRef: MatDialogRef<EpmloyeeComponent>) { }

  ngOnInit(): void {
    this.btnName = "Submit"
    this.service.getEmpList();
  }
  //On Submit
  onSubmit() {
    if (this.service.form.valid) {
      this.service.insertEmp(this.service.form.value);
      console.log(this.service.form.value);
      this.service.form.reset();
      this.service.onInitialize();
      this.notification.success('Submitted Successfully')
      this.onClose();
    }
  }
  onClose() {
    this.service.form.reset()
    this.service.onInitialize();
    this.dialogRef.close();
  }

}
