// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
declare const require: any;
const { name, description, version } = require('../../package.json');

export const environment = {
  production: false,
  api: 'http://192.168.1.87:8002/api',
//api: 'http://127.0.0.1:8000/api',
 // api: 'http://localhost:8000/api',
  name,
  description,
  version
};
