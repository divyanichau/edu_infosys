export class feeCollection{
    student_id : number
    fee_allocation_id :number
    amount :number;
    remarks : string
    total_amount :number
}




export class PaymentDetail{
    id : number;
    fee_for :number;
    _class : number;
    fee_category : number;
    total_amount : number;
    paid_amount : number;
}

export class FeeCollection{
    student_id : number
    fee_allocation_id :number
    receipt_number : number
    remarks : number
    payment_detail : PaymentDetail[]
}

export class PaymentHistory{
    name : string
    fee_category : string
    paid_date : Date
    dues :number
    payment_status:number
    paid_amount :number
}

export class PaymentHistory1{
    id : number
    fee_category : string
    date : Date
    dues :number
    paid:number
}

export class PaymentStatement{
    payment_history:PaymentHistory1[]
    total_dues : number
    total_paid : number
    remaining_to_pay:number
    total_paid_in_words : string
}