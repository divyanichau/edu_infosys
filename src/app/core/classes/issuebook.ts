import { Course } from './course';
import { Student } from './student';

export class IssueBook {
  id: number;
  batch: string;
  issue_date : date;
  due_date : date;
  book : string;
}