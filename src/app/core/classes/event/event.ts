import { Task } from './task';

export class Event {
  id: number;
  name: string;
  description: string;
  status: string;
  manager: number;
  progress: number;
  date_start: Date;
  date_end: Date;
 // tasks: Task[] = [];
   type: number;


}
export class EventType{
	id:number;
	 type: number;
}