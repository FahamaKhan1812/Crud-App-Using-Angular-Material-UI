import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  deptList!: AngularFireList<any>;
  array: any = [];

  constructor(private firebase: AngularFireDatabase) {
    this.deptList = this.firebase.list('department');
    this.deptList.snapshotChanges()
      .subscribe(
        list => {
          this.array = list.map(
            item => {
              return {
                $key: item.key,
                ...item.payload.val()
              }
            }
          )
        }
      );
  }
  getdeptName($key: string) {
    if ($key == "0") {
      return ""
    }
    else {
      return _.find(this.array, (obj) => { return obj.$key == $key; })['name'];
    }
  }
}
