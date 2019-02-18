import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FeeMaintainanceService } from 'src/app/core/services/accounting/fee-maintainance.service';
import { Subscription } from 'rxjs';
import { FeeCategory } from 'src/app/core/classes/Accounting/feeMaintainance/fee-category';
import { AllocateFees } from '../../../core/classes/Accounting/feeMaintainance/allocate-fees';
import { CourseService } from 'src/app/core/services/course.service';
import { ClassService } from 'src/app/core/services/class.service';
import { FeeAllocateService } from 'src/app/core/services/accounting/fee-allocate.service';

@Component({
  selector: 'app-fee-allocation',
  templateUrl: './fee-allocation.component.html',
  // styleUrls: ['./fee-allocation.component.css']
})
export class FeeAllocationComponent implements OnInit {

  private _sub: Subscription = undefined;
  _feeCategories : FeeCategory[]
  bool :boolean = false
  selected_category: number;
  courses: import("/home/dinesh/projects/Btech-EduInfosis/FrontEnd/src/app/core/classes/course").Course[];
  selected_course: number;
  classes: import("/home/dinesh/projects/Btech-EduInfosis/FrontEnd/src/app/core/classes/class")._class[];
  selected_class: number;
  _feeAlloation : AllocateFees = new AllocateFees()
  _feeAlloation1 : AllocateFees = new AllocateFees()
  _allocated_fees : AllocateFees[]
  _allocated_fees1 : AllocateFees[]
  selected_fee_for: number;
  fe_id: number;
  total_amount :number;


  constructor(
    private _utils:UtilsService,
    private _feeCategoryService:FeeMaintainanceService,
    private _courseService:CourseService,
    private _classService:ClassService,
    private _feeAllocationService : FeeAllocateService
  ) { }

  ngOnInit() {
    this.initFeeAllocation()
   
  }

  initCourse() {

    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
        data => {
            this.courses = data ;
            if (this.courses.length > 0) {
                this.selected_course = this.courses[0].id;
                this.initClass();
            }
        }
    );
}

initClass() {
  this._utils.unsubscribeSub(this._sub);
  this._sub = this._classService.getWithCourse(this.selected_course).subscribe(
      data => {
          this.classes = data;
          if (this.classes.length > 0) {
              this.selected_class = this.classes[0].id;
            
          }
          this.initFeeCategory();


         

      }
  );
}

  initFeeCategory(){
    this._utils.unsubscribeSub(this._sub);
      this._sub = this._feeCategoryService.getFeeCategory()
        .subscribe(data => {
          this._feeCategories = data
          this.selected_category = this._feeCategories[0].id
        });

  }

  

  OnChangeFeeeFor(val:any){
  this.selected_fee_for = val
      // console.log(val)
      if (val == '2'){
        this.bool = true
      }
      if (val=='1'){
        this.bool=false
      }
  }
  onCourseChange(course_id) {
    this.selected_course = course_id;
    console.log(this.selected_course)
    this.initClass();
 //   this.loadExamTerm()
}

allocateFees(){
  this._feeAlloation._class = this.selected_class
  this._feeAlloation.fee_category = this.selected_category
 
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._feeAllocationService.feeAllocate(this._feeAlloation)
      .subscribe(data => {
       
        this.initFeeAllocation()
      });
}

initFeeAllocation(){
  this._utils.unsubscribeSub(this._sub);
  this._sub = this._feeAllocationService.getFeeAllocation()
    .subscribe(data => {
      this._allocated_fees = data
   this.initCourse()
    });
}

OnRowClick(value:number){
 this.fe_id = value
  this._utils.unsubscribeSub(this._sub);
  this._sub = this._feeAllocationService.findFeeAllocation(value)
    .subscribe(data => {
      this._feeAlloation1 = data
      // console.log(this._allocated_fees1)
  
    });
}

allocateFeesUpdate(){
  this._utils.unsubscribeSub(this._sub);
  this._sub = this._feeAllocationService.updateFeeAllocation(this._feeAlloation1,this.fe_id)
    .subscribe(data => {
     
  // this.initFeeAllocation()
    });
}


}
