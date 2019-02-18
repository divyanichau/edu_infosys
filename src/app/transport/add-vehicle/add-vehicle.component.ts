import { Component, OnInit,ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import {DatatableComponent}  from '@swimlane/ngx-datatable';

import { DriverService } from '../../core/services/driver.service';
import { VehicleService } from '../../core/services/vehicle.service';
import { UtilsService } from '../../shared/services/utils.service';

import { _Driver } from '../../core/classes/driver';
import { Vehicle } from 'src/app/core/classes/vehicle';


@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: []
})
export class AddVehicleComponent implements OnInit {

  private _sub: Subscription = undefined;
  obj: _Driver = new _Driver();
  vobj : Vehicle = new Vehicle(); 
  _driver: _Driver[];
  selected_driver: number;
  vehicles:Vehicle[];
  rows: any[] = [];
  temp: any[] = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
  
    private _driverService: DriverService,
    private _vehicleService : VehicleService,
    private _utils: UtilsService,
    private toastr: ToastrService,
   
  ) {
  
   
   }

  ngOnInit() {
    this.loadDriver();
    

  }

  onSubmitDriver() {
    //console.log("Driver Add Form Initiated")
    this._utils.unsubscribeSub(this._sub);
    this.vobj.driver = this.selected_driver;
    console.log(this.vobj);
    //console.log(this.obj)
    this._sub = this._driverService.AddDriver(this.obj).subscribe(data => {
     // console.log(data);
      //alert("Driver Added");
  
    });

  }
  onSubmitVehicle(){
    // console.log("Vehicle Iitiated")
    // console.log("driver",this.selected_driver);
    this.vobj.driver=this.selected_driver;
    console.log(this.vobj);
   
   // console.log(this.vobj);
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._vehicleService.AddVehicle(this.vobj)
                    .subscribe();
  }

  loadDriver() {

    this._utils.unsubscribeSub(this._sub);
    this._sub = this._driverService.getDriver().subscribe(
      data => {
        isArray(data) ? this._driver = data : data;
       // console.log("Selected Driver",this._driver);
        this.selected_driver = this._driver[0].id;
        this.loadVehicle();
      }
    );
    }

    loadVehicle(){
      this._utils.unsubscribeSub(this._sub);
      this._sub = this._vehicleService.get().subscribe(
        data => {
          //console.log(data)
          isArray(data) ? this.vehicles = data : data;
          console.log("veicles",this.vehicles);
         // console.log("allocated_Student",this.allocated_student);
          //  this.rows = this.allocated_student;
          // this.temp = [...this.allocated_student];
    }
      );
    }
    vehicleDelete(id:number){
      console.log(id);
      if(confirm("Are You Sure Want To Delete?")){
        this._vehicleService.delete(id).subscribe(data => 
          {
          //console.log(data);
          // this.toastr.success('Vehicle Added !', 'Success', { timeOut: 3000 });
         },(err)=>{
           console.log(err);
           alert(err);
         }
         );
       }
    }
  
}
  