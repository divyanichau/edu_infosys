export class ResultPreparation{
    section:number;
    exam:number;
    subject:number;
    student_id?:number;
    student_name?:string;
    total?:string;
    discipline?:number
    result:string
    position:string

}

export class ResultPreparationUpdate{
    section:number;
    exam:number;
    subject:number
    result_preparation:ResultPreparation[]
}
