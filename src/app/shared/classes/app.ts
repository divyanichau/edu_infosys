import { environment } from '../../../environments/environment';

class College {
	name : string
}

export class Config {
  name: string = environment.name;
  description: string = environment.description;
  version: string = environment.version;
  api: string = environment.api;
  college: College = environment.college;
}
