import { Address } from './address';
import { User } from './user';
import { UserDetail } from './userdetail';
import { Phone } from './phone';


export class Teacher {
  id: number;
  user: User = new User();
  user_detail: UserDetail = new UserDetail();
  phone_detail: Phone = new Phone();
  address_detail: Address = new Address();
  description: string;
  qualification: string;
  name: string;

}

