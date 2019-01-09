import { MarksType, MT} from './marks_type';
import { Student_Result } from './student_result';

export class MarksEntry{
course:number;
class:number;
section:number;
subject:number;
exam:number;
marks_type: MarksType = new MarksType();
student_data:Student_Result = new Student_Result()

}