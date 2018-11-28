const DB = require('../util/DB/manager')

module.exports = {
  addComment: async ({ task_id, type, content, creator, commit1, commit2, file, block_index, line_index }) => {
    const res = await DB.insert('Comment', {
      task_id,
      creator,
      type, 
      content, 
      create_time: new Date(), 
      commit1, 
      commit2,
      file,
      block_index,
      line_index
    })
    if (res) {
      return {
        flag: true,
        id: res
      }
    }
    return {
      flag: false,
      errmsg: '新建评论失败'
    }
  },
  getCommentsOfTask: async ({ task_id }) => {
    const res = await DB.select('Comment', { task_id }, 'creator, create_time, content, type, id');
    if (res) {
      return {
        flag: true,
        res,
      }
    }
    return {
      flag: false,
      errmsg: '获取评论失败'
    }
  },
  getCommentsOfDiff: async ({ commit1, commit2, file }) => {
    const res = await DB.select('Comment', { commit1, commit2, file, block_index, line_index }, 'creator, create_time, content, id');
    if (res) {
      return {
        flag: true,
        res,
      }
    }
    return {
      flag: false,
      errmsg: '获取评论失败'
    }
  }
}