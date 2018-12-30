import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';

import { UtilsService } from '../../shared/services/utils.service';
import { DriverService } from '../../core/services/driver.service';
import { _Driver } from '../../core/classes/driver';


@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: []
})
export class AddVehicleComponent implements OnInit {

  private _sub: Subscription = undefined;
  obj: _Driver = new _Driver();
  _driver: _Driver[];
  selected_driver: number;

  constructor(
    private _utils: UtilsService,
    private _driverService: DriverService
  ) { }

  ngOnInit() {
    this.loadDriver();
  }

  onSubmitDriver() {
    //console.log("Driver Add Form Initiated")
    this._utils.unsubscribeSub(this._sub);
    //console.log(this.obj)
    this._sub = this._driverService.AddDriver(this.obj).subscribe(data => {
     // console.log(data);
      alert("Driver Added");
    });

  }

  loadDriver() {

    this._utils.unsubscribeSub(this._sub);
    this._sub = this._driverService.getDriver().subscribe(
      data => {
        isArray(data) ? this._driver = data : data;
        console.log(this._driver);
        this.selected_driver = this._driver[0].id;

      }
    );
    }
}
  