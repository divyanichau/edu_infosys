import { Gurdain } from './gurdain';
import { Address } from './address';
import { User } from './user';
import { Phone } from './phone';


export class Student {
  id: number;
  course: number;
  _class: number;
  section: number;
  registration_no: number;
  admission_date: Date;
  status: string;
  user: User = new User();
  phone: Phone = new Phone();
  address: Address = new Address();
  
  father: Gurdain = new Gurdain();
  mother: Gurdain = new Gurdain();
}

