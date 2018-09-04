const Task = require('../models/task.js')

module.exports = {
  newTask: async (ctx) => {
    ctx.response.type = 'json'
    let { title, repository, sourceBranch, destBranch, type, date, reviewers, desc, startCommit } = ctx.request.body
    let creator = 1
    const ret = await Task.newTask({ title, repository, sourceBranch, destBranch, type, date, reviewers, desc, creator, startCommit })
    ctx.response.body = ret.flag ? { flag: true, data: ret.id , msg: '成功'} : ret
  },
  getTaskList: async (ctx) => {
    ctx.response.type = 'json'
    const ret = await Task.getAll();
    ctx.response.body = ret.flag ? { flag: true, data: ret.res , msg: '成功'} : ret 
  },
  getTaskDetail: async ctx => {
    let { id } = ctx.request.query;
    const ret = await Task.getTaskBaseInfoById(id);
    ctx.response.body = ret.flag ? { flag: true, data: ret.res , msg: '成功'} : ret 
  },
  closeTask: async ctx => {
    let { id } = ctx.request.body;
    const ret = await Task.setTask({id}, {status: 1});
    ctx.response.body = ret.flag ? { flag: true, data: ret.res , msg: '成功'} : ret 
  }
}
