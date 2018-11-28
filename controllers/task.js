const Task = require('../models/task.js')
const Repo = require('../models/repo.js')
const Commit = require('../models/commit.js')
const Comment = require('../models/comment.js')
const {success, fail} = require('../util/util.js')

module.exports = {
  newTask: async (ctx) => {
    ctx.response.type = 'json'
    let {title, description, repo, sourceBranch, destBranch, type, date1, date2, startCommit, reviewers} = ctx.request.body
    let creator = 1
    const ret = await Task.newTask({title, description, repo, sourceBranch, destBranch, type, createTime: date2, startCommit, creator, reviewers})
    ctx.response.body = ret.flag ? { flag: true, data: ret.id , msg: '成功'} : ret
  },
  getTaskList: async (ctx) => {
    ctx.response.type = 'json'
    const ret = await Task.getAll()
    ctx.response.body = ret.flag ? { flag: true, data: ret.res , msg: '成功'} : ret 
  },
  getTaskDetail: async ctx => {
    let { id } = ctx.request.query
    const ret = await Task.getTaskBaseInfoById(id)
    const localRepo = await Repo.getLocalRepo(ret.res.repo)
    const commits = await Commit.getBranchCommits(localRepo, ret.res.sourceBranch)
    if (commits.flag) {
      ret.res.commits = commits.res;
    } else {
      ret.res.commits = [];
    }
    ctx.response.body = ret.flag ? { flag: true, data: ret.res , msg: '成功'} : ret 
  },
  closeTask: async ctx => {
    let { id } = ctx.request.body
    const ret = await Task.setTask({id}, {status: 1})
    ctx.response.body = ret.flag ? { flag: true, data: ret.res , msg: '成功'} : ret 
  },
  addComment: async ctx => {
    let {taskId, type, content, file, commit1, commit2, block_index, line_index} = ctx.request.body
    let creator = ctx.cookies.get('username')
    const ret = await Comment.addComment({task_id: taskId, type, content, creator, file, commit1, commit2, block_index, line_index})
    ctx.response.body = ret.flag ? success() : ret
  },
  getCommentsOfTask: async ctx => {
    let {taskId, commit1, commit2, file, type} = ctx.request.query
    let ret;
    if (type == 0) {
      ret = await Comment.getCommentsOfDiff({task_id: taskId, commit1, commit2, file, type})
    } else {
      ret = await Comment.getCommentsOfTask({task_id: taskId});
    }
    ctx.response.body = ret.flag ? success(ret.res) : ret 
  }
}
