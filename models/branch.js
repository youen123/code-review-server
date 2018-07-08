const exec = require('child_process').exec

  // 是否存在分支
let isBranchExisted = async (localRepoPath, branch) => {
    var arr = await getBranches(localRepoPath)
    for (let item of arr) {
      if (item === branch) {
        return true
      }
    }
    return false
}

// 获取仓库的分支
let getBranches = (localRepoPath) => {
    let cmd = `cd ${localRepoPath} && git branch -r | grep -v '\\->'`
    return new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if(err) {
          console.log('error:' + stderr);
          reject(stderr)
        } else {
          var arr = stdout.split('\n').filter((item) => {
            return item !== ''
          }).map((item) => {
            return item.trim().replace('origin/', '');
          })
          resolve(arr)
        }
      })
    })
}

module.exports = {
  getBranches,
  isBranchExisted
}