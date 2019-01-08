import { Gurdain } from './gurdain';
import { Address } from './address';
import { User } from './user';
import { UserDetail } from './userdetail';
import { Phone } from './phone';


export class StudentReport {
  id: number;
  report:string;
  batch: number;
  category:string;

  religion: number;
  route_code:string;
  fees:number;
  bloodgroup:string;
  caste:string;
  gender:string;
  state:string;

  // section: number;
  // admission_date: Date;
  // status: string;
  // user: User = new User();
  // user_detail: UserDetail = new UserDetail();
  // phone_detail: Phone = new Phone();
  // address_detail: Address = new Address();
  // registration_no: number;
  
  // description: string;
  // father: Gurdain = new Gurdain();
  // mother: Gurdain = new Gurdain();
}

