/**
 * 编译时，根据不同命令，将env/(development.js|testing.js|production.js)重命名后置于src下
 * 同时重命名为env.js
 */
const { host } = require('./env.js');

module.exports = {
  // 登录 post
  login: `${host}/xxx/xxx/login`
};
