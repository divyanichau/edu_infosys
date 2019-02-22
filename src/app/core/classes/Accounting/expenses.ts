export class ExpenseType{
    id?:number;
    name:string;
    description:string
}

export class ExpenseTypeUpdate{
    id:number
    name:string;
    description:string
}

export class DailyExpense{
    id :number
    expense_type:number;
    expense_detail:string;
    amount : number;
    expense_date : Date;
    receipt_number:number
}

export class ExpenseSelection{
    select_type : number
    expense_category : number;
    start_date : Date;
    end_date :Date
}

export class SelectType {
    select_type :number;
}