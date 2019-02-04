import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FeeCategory } from '../../../core/classes/Accounting/feeMaintainance/fee-category'
import { FeeMaintainanceService } from 'src/app/core/services/accounting/fee-maintainance.service';

@Component({
  selector: 'app-fee-category',
  templateUrl: './fee-category.component.html',
  // styleUrls: ['./fee-category.component.css']
})
export class FeeCategoryComponent implements OnInit {
  private _sub: Subscription = undefined;
  _feeCategory : FeeCategory =  new FeeCategory()
  _feeCategories : FeeCategory[]
  _feeCategories1 :FeeCategory =  new FeeCategory()
  _feeCategory_id: number;

  constructor(
    private _utils:UtilsService,
    private _feeCategoryService:FeeMaintainanceService
  ) { }

  ngOnInit() {
    this.initFeeCategory()
  }

  onSubmitFeeCategory(){
   // console.log(this._feeCategory)
      this._utils.unsubscribeSub(this._sub);
      this._sub = this._feeCategoryService.AddFeeCategory(this._feeCategory)
        .subscribe(data => {
         
          this.initFeeCategory()
        });
  }

  initFeeCategory(){
    this._utils.unsubscribeSub(this._sub);
      this._sub = this._feeCategoryService.getFeeCategory()
        .subscribe(data => {
          this._feeCategories = data
        });

  }

  OnRowClick(value:number){
    this._feeCategory_id = value
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._feeCategoryService.findFeeCategory(value)
      .subscribe(data => {
        this._feeCategories1 = data;
        // console.log(this._feeCategories1)
      
       
      });
  
  }
  onSubmitFeeCategoryUpdate(){
    // console.log(this._feeCategory)
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._feeCategoryService.updatefeeCategory(this._feeCategories1,this._feeCategory_id)
      .subscribe(data => {
       
        this.initFeeCategory()
      });

  }
  
}
