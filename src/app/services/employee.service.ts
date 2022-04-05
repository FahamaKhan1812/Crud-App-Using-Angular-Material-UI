import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) { }

  empList!: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null), // '$' this work as a Primary Key.
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.maxLength(11)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hiredate: new FormControl(''),
    isPerment: new FormControl(false)
  });


  onInitialize() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '',
      department: 0,
      hiredate: '',
      isPerment: false
    });
  }

  // Get All emps
  getEmpList() {
    this.empList = this.firebase.list('employees');
    return this.empList.snapshotChanges();
  }

  //Add New Employee
  insertEmp(employee: any) {
    this.empList.push({
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hiredate: employee.hiredate == "" ? "" : this.datePipe.transform(employee.hiredate, 'dd-MM-yyyy'),
      isPerment: employee.isPerment
    });
  }

  //Update emp
  updateEmp(employee: any) {
    this.empList.update(employee.$key,
      {
        fullName: employee.fullName,
        email: employee.email,
        mobile: employee.mobile,
        city: employee.city,
        gender: employee.gender,
        department: employee.department,
        hiredate: employee.hiredate == "" ? "" : this.datePipe.transform(employee.hiredate, 'dd-MM-yyyy'),
        isPerment: employee.isPerment
      });
  }

  //Delete a emp
  deleteEmp($key: string) {
    this.empList.remove($key);
  }

  populateForm(employee: any) {
    this.form.setValue(
      _.omit(employee, 'deptName')
    );
  }
}
