import { Course } from './course';
import { Student } from './student';

export class IssueBook {
  id: number;
  batch: string;
  issue_date : Date;
  due_date : Date;
  book : string;
}