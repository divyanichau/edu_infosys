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
    expense_type:number;
    expense_detail:string;
    amount : number;
    expense_date : Date;
    receipt_number:number
}