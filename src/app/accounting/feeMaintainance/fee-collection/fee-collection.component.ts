import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FeeMaintainanceService } from 'src/app/core/services/accounting/fee-maintainance.service';
import { Subscription } from 'rxjs';
import { FeeAllocateService } from 'src/app/core/services/accounting/fee-allocate.service';
import { AllocateFees } from 'src/app/core/classes/Accounting/feeMaintainance/allocate-fees';
import { FeeCollection,PaymentHistory,PaymentStatement, feeCollection } from 'src/app/core/classes/Accounting/feeMaintainance/fee_collection';
import { CourseService } from 'src/app/core/services/course.service';
import { ClassService } from 'src/app/core/services/class.service';
import { Course } from 'src/app/core/classes/course';
import { _class } from 'src/app/core/classes/class';
import { Student } from 'src/app/core/classes/student';
import { StudentService } from 'src/app/core/services/student.service';
import { FeeCollectionService } from 'src/app/core/services/accounting/fee-collection.service';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-fee-collection',
  templateUrl: './fee-collection.component.html',
  // styleUrls: ['./fee-collection.component.css']
})
export class FeeCollectionComponent implements OnInit {
  private _sub: Subscription = undefined;

  rows: any[] = [];
  temp: any[] = [];
  editing = {};
  
  total_paid_amount : number = 0;
  remaining_amount : number = 0
  courses:Course[]
  classes: _class[];
  students:Student[]
  _payment_history : PaymentHistory[]
  _payment_statement : PaymentStatement = new PaymentStatement()
 

  _allocated_fees : AllocateFees[];
  _feeCategory :AllocateFees[]
  selected = [];
  fee_detail:  AllocateFees[];
  fee_collection : FeeCollection = new FeeCollection()
  _fee_collection : feeCollection = new feeCollection()

  total_dues :number = 0
  selected_course: number;
  selected_class: number;
  selected_student: number;
  selected_fee_category : number;
  allocation_id: number;
  va : boolean = true;
  total_amount :number;
  paid_amount :number ;
  Cc_id: any;

  student_name :string;
  Paid_amount :number;
  Payment_Category :number;
  boo :boolean = true

  constructor(
    private _utils:UtilsService,
    private _feeAllocationService : FeeAllocateService,
    private _courseService:CourseService,
    private _classService:ClassService,
    private _studentService:StudentService,
    private _feeCollectionService:FeeCollectionService
  ) { }

  ngOnInit() {
    // this.fee_collection.mode_of_payment = 0
    this.initCourse()
  }


  // initAllocation(){
  // this._utils.unsubscribeSub(this._sub);
  // this._sub = this._feeAllocationService.getFeeAllocationWithStudent(this.selected_student,this.selected_class)
  //   .subscribe(data => {
  //     this._allocated_fees = data
  //     // console.log(this._allocated_fees)
  //     this.selected_fee_category = this._allocated_fees[0].id
  //     // console.log(this._allocated_fees.receipt_number)
  //     // this.fee_collection.receipt_number = this._allocated_fees
  //     this.rows = this._allocated_fees
  //     this.initPaymentHistory()
    
  //   });
  // }


  initCourse() {

    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
        data => {
            this.courses = data;
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
              this.initStudent()
          
          }
      }
  );
}

initStudent(){
  this._utils.unsubscribeSub(this._sub);
  this._sub = this._studentService.get().subscribe(
    data => {
      this.students = data;
      this.selected_student = this.students[0].id
      this.initFeeCategory()
    }
  );
}

initFeeCategory(){
    this._utils.unsubscribeSub(this._sub);
  this._sub = this._feeAllocationService.getFeeAllocation().subscribe(
    data => {
      this._feeCategory = data
      this.selected_fee_category = this._feeCategory[0].id

      this.selected_fee_category = this.Cc_id
      for(let fc of this._feeCategory){
        if (fc.id == this.selected_fee_category){
          this.Payment_Category = fc.fee_category;
          this.total_amount = fc.total_amount
          this._fee_collection.fee_allocation_id = fc.id
         
        }
    }
    this.initPaymentHistory()
    }
  
  );



}
onChangeFeeCategory(course_category_id){
  this.Cc_id = course_category_id
  this.initFeeCategory()
}

OnSubmitPayment(){
  if (confirm('Are you sure you want to Submit Payment')) {
    this._fee_collection.student_id = this.selected_student
    console.log(this._fee_collection)
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._feeCollectionService.AddFeeCollection(this._fee_collection)
    .subscribe(data => {
    this.initPaymentHistory()

  });
}


}

verifyData(){
  this.boo = false
  this.Paid_amount = this._fee_collection.amount
  for(let std of this.students){
    if(std.id == this.selected_student){
      this.student_name = std.name
    }
  }
}

initPaymentHistory(){
  this._utils.unsubscribeSub(this._sub);
  this._sub = this._feeCollectionService.getPaymentHistory(this.selected_student,this.selected_class)
  .subscribe(data => {
    this._payment_history = data
    // this.initPaymentStatement()
    console.log(this._payment_history)
  

});
}

onChangeStudent(_student_id:number){
  this.selected_student = _student_id
  this.initPaymentHistory()
}
onCourseChange(_course_id:number){
  this.selected_course = _course_id
  this.initClass()
}

onClassChange(_class_id:number){
  this.selected_class = _class_id
  // this.initAllocation()
}



  updateValue(event, cell, rowIndex) {
    // console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this._allocated_fees[rowIndex][cell] = event.target.value;
    this._allocated_fees = [...this.rows];
    this.fee_collection.payment_detail = this._allocated_fees
    this.paid_amount = eval(this._allocated_fees[rowIndex]['paid_amount'].toString())
    this.total_paid_amount = this.total_paid_amount + this.paid_amount
    this.calculateRemainingAmount(this.total_dues,this.total_paid_amount)
    // console.log('UPDATED!', this._allocated_fees[rowIndex][cell]);
  }


  onSelect({ selected }) {
    // console.log('Select Event', selected);
    this.fee_detail = selected
    if (this.fee_detail.length>0){
      for (let obj of this.fee_detail){
       
        this.total_dues = this.total_dues + obj.total_amount
        this.calculateRemainingAmount(this.total_dues,this.total_paid_amount)
        
      }
    }

    else{
      this.total_dues = 0
    }

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

  }

  calculateRemainingAmount(dues:number,paid:number){
    this.remaining_amount = dues - paid
  }

  // onActivate(event) {
  //   console.log('Activate Event', event);
  // }

  // OnRowClick(){
  //   // console.log(this.fee_detail)
  //   for( let obj of  this.fee_detail){
  //     // console.log(obj.total_amount)
  //   }
  // }

 

  initPaymentStatement(){

    this._utils.unsubscribeSub(this._sub);
    this._sub = this._feeCollectionService.getPaymentStatement(this.selected_student,this.selected_class)
      .subscribe(data => {
        this._payment_statement = data
    
    });

  }

  LoadStatement(){
    this.va = false
  }
  LoadHistory(){
    this.va = true
  }

}
