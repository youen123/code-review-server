const DB = require('../util/DB/manager.js')
const Repo = require('./repo.js')

module.exports = {
  // 新建任务
  newTask: async ({title, description, repo, sourceBranch, destBranch, type, createTime, startCommit, creator, reviewers}) => {
    const isRepoValid = await Repo.isValid(repo)
    if (!isRepoValid) {
      return {
        flag: false,
        errmsg: '暂无此仓库的权限'
      }
    }
    const ret = await DB.insert('Task', {title, description, repo, sourceBranch, destBranch, type, createTime, startCommit})
    // console.log(ret)
    if (ret === false) {
      return {
        flag: false,
        errmsg: '新建任务失败'
      }
    }
    for (let reviewer of reviewers) {
      DB.insert('Task_User', { task_id: ret, creator_id: creator, reviewer_id: reviewer})
    }
    Repo.newRepo(repo)
    return {
      flag: true,
      id: ret
    }
  },

  getAll: async () => {
    var res = await DB.select('task',{});
    if (res) {
      return {
        flag: true,
        res: res
      }
    } else {
      return {
        flag: false
      }
    }
  },
  // 查询任务基本信息
  getTaskBaseInfoById: async (id) => {
    var res = await DB.select('task',{id: id});
    if (res.length) {
      return {
        flag: true,
        res: res[0]
      }
    } else {
      return {
        flag: false
      }
    }
  },
  // 修改任务
  setTask: async ({id}, {status}) => {
    var res = await DB.update('task', {status}, {id});
    if (res) {
      return {
        flag: true,
        res: res
      }
    } else {
      return {
        flag: false
      }
    }
  },
  // 查询任务
  getLists: ({creator, reviewer}) => {

  }
}
