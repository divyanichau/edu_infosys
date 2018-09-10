import { Gurdain } from './gurdain';
import { Address } from './address';
import { User } from './user';
import { UserDetail } from './userdetail';
import { Phone } from './phone';


export class Student {
  id: number;
  user: User = new User();
  user_detail: UserDetail = new UserDetail();
  phone_detail: Phone = new Phone();
  address_detail: Address = new Address();
  registration_no: number;
  batch: number;
  course: number;
  description: string;
  father: Gurdain = new Gurdain();
  mother: Gurdain = new Gurdain();
}

