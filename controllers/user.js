const User = require('../models/user');

module.exports = {
  login: async ctx => {
    let { name, password } = ctx.request.body
    console.log(name, password);
    if (await User.isValidUser({name, password})) {
      ctx.session.username = name;
      ctx.cookies.set('username', name, {
        httpOnly: false
      })
      ctx.response.body = { flag: true, data: null , msg: '成功'}
    } else {
      ctx.response.body = { flag: false, data: null , msg: '请输入正确的用户名密码！'}
    }
  },
  logout: ctx => {
    ctx.cookies.set('username', '');
    ctx.response.body = { flag: true, data: null , msg: '成功'}
  }
}
