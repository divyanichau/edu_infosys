import { Gurdain } from './gurdain';

export class Student {
  id: string;
  name: string;
  email: string;
  batch: number;
  father: Gurdain = new Gurdain();
}
