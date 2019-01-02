
declare const require: any;
const { name, description, version } = require('../../package.json');

export const environment = {
  production: true,
  api: 'http://192.168.1.87:8002/api',
  name,
  description,
  version
};
