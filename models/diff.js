const exec = require('child_process').exec

let diff2html = require("diff2html").Diff2Html

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
  get2BranchDiffFileList(repo, branch1, branch2) {
    let cmd = `cd ${repo} && git diff ${branch1} ${branch2} --stat`
    console.log(cmd)
    return new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if(err) {
          console.log('error:' + stderr);
          reject(stderr)
        } else {
          console.log('ok!' + stdout)
          let arr = parseFileDiff(stdout);
          resolve(arr);
        }
      })
    })
  },
  get2CommitDiffFileList(repo, branch, hash1, hash2) {
    let cmd = `cd ${repo} && git checkout ${branch} && git diff ${hash1} ${hash2} --stat`
    console.log(cmd)
    return new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if(err) {
          console.log('error:' + stderr);
          reject(stderr)
        } else {
          console.log('ok!' + stdout)
          let arr = parseFileDiff(stdout);
          resolve(arr);
        }
      })
    })    
  },

  get2BranchDiffFile(repo, branch1, branch2, file) {
    let cmd = `cd ${repo} && git diff ${branch1} ${branch2} ${file}`
    console.log(cmd)
    return new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if(err) {
          console.log('error:' + stderr);
          reject(stderr)
        } else {
          let outhtml = diff2html.getPrettyHtml(stdout)
          resolve(outhtml)
        }
      })
    })
  },

  get2CommitDiffFile(repo, hash1, hash2, file) {
    let cmd = `cd ${repo} && git diff ${hash1} ${hash2} ${file}`
    console.log(cmd)
    return new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if(err) {
          console.log('error:' + stderr);
          reject(stderr)
        } else {
          let outhtml = diff2html.getPrettyHtml(stdout)
          resolve(outhtml)
        }
      })
    })
  }
}
