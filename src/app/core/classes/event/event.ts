import { Task } from './task';

export class Event {
  id: number;
  name: string;
  description: string;
  status: string;
  manager: string;
  progress: number;
  date_start: Date;
  date_end: Date;
 // tasks: Task[] = [];
 // type: string;

}