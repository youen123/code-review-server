// const exec = require('child_process').exec

let diff2html = require("diff2html").Diff2Html
let {exec} = require('../util/util')

let parseFileDiff = (stdout) => {
  let arr = stdout.split('\n')
  arr = arr.slice(0, arr.length - 2)
  arr = arr.map(item => {
    let pair = item.split('|')
    return {
        name: pair[0].trim(),
        change: pair[1].trim()
    }
  })
  return arr;
}
module.exports = {
  get2BranchDiffFileList: async (repo, branch1, branch2) => {
    let cmd = `cd ${repo} && git diff ${branch1} ${branch2} --stat`
    console.log(cmd)
    try {
      let ret = await exec(cmd);
      return {
        flag: true,
        res: parseFileDiff(ret)
      }
    } catch(err) {
      return {
        flag: false,
        errmsg: err.message ||'failed'
      }
    }   
  },
  get2CommitDiffFileList: async(repo, branch, hash1, hash2) => {
    try {
      let ret = await exec(`cd ${repo} && git checkout ${branch}`);
      ret = await exec(`cd ${repo} && git diff ${hash1} ${hash2} --stat`);
      return {
        flag: true,
        res: parseFileDiff(ret)
      }
    } catch(err) {
      return {
        flag: false,
        errmsg: err.message ||'failed'
      }
    }   
  },

  get2BranchDiffFile: async(repo, branch1, branch2, file) => {
    let cmd = `cd ${repo} && git diff ${branch1} ${branch2} ${file}`
    console.log(cmd)
    try {
      let ret = await exec(cmd);
      return {
        flag: true,
        res: diff2html.getPrettyHtml(ret)
      }
    } catch(err) {
      return {
        flag: false,
        errmsg: err.message ||'failed'
      }
    }
  },

  get2BranchDiffJSON: async(repo, branch1, branch2, file) => {
    let cmd = `cd ${repo} && git diff ${branch1} ${branch2} ${file}`
    console.log(cmd)
    try {
      let ret = await exec(cmd);
      return {
        flag: true,
        res: diff2html.getJsonFromDiff(ret)
      }
    } catch(err) {
      return {
        flag: false,
        errmsg: err.message ||'failed'
      }
    } 
  },

  get2CommitDiffFile: async(repo, hash1, hash2, file) => {
    let cmd = `cd ${repo} && git diff ${hash1} ${hash2} ${file}`
    console.log(cmd)
    try {
      let ret = await exec(cmd);
      return {
        flag: true,
        res: diff2html.getPrettyHtml(ret)
      }
    } catch(err) {
      return {
        flag: false,
        errmsg: err.message ||'failed'
      }
    }
  },

  get2CommitDiffJSON: async(repo, hash1, hash2, file) => {
    let cmd = `cd ${repo} && git diff ${hash1} ${hash2} ${file}`
    console.log(cmd)
    try {
      let ret = await exec(cmd);
      return {
        flag: true,
        res: diff2html.getJsonFromDiff(ret)
      }
    } catch(err) {
      return {
        flag: false,
        errmsg: err.message ||'failed'
      }
    } 
  }
}
