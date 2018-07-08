const exec = require('child_process').exec

module.exports = {
  getDiffFileList(repo, branch1, branch2) {
    let cmd = `cd ../repos/${repo} && git diff ${branch1} ${branch2} --stat`
    console.log(cmd)
    return new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if(err) {
          console.log('error:' + stderr);
          reject(stderr)
        } else {
          console.log('ok!' + stdout)
          let arr = stdout.split('\n')
          arr = arr.slice(0, arr.length - 2)
          arr = arr.map(item => {
            let pair = item.split('|')
            return {
                name: pair[0].trim(),
                change: pair[1].trim()
            }
          })
          console.log(arr)
          resolve(stdout)
        }
      })
    })
  },
  getFileDiffView(repo, branch1, branch2, filename) {
    
  }
}
