  // 获取某个仓库分支的提交
  let getCommits = (localRepo, branch, since) => {
    let cmd = `cd ../repos/${localRepo} && git checkout ${branch} && git log --pretty=format:"%h #---# %ad #---# %cn #---# %s" --date=iso`
    if (since) {
      cmd += ` --since=${since}`; 
    }
    return new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if(err) {
          reject(stderr)
        } else {
          var arr = stdout.split('\n').filter((item) => {
            return item !== ''
          }).map((item) => {
            let obj = {};
            let arr = item.split(' #---# ');
            obj.sha = arr[0];
            obj.date = arr[1].slice(0, arr[1].length - 6);
            obj.commiter = arr[2];
            obj.msg = arr[3];
            return obj;
          })
          console.log(arr)
          resolve(arr)
        }
      })
    })
  }

  // 获取某个仓库分支的提交
let getCommits = (localRepo, branch, since) => {
    let cmd = `cd ../repos/${localRepo} && git checkout ${branch} && git log --pretty=format:"%h #---# %ad #---# %cn #---# %s" --date=iso`
    if (since) {
      cmd += ` --since=${since}`; 
    }
    return new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if(err) {
          reject(stderr)
        } else {
          var arr = stdout.split('\n').filter((item) => {
            return item !== ''
          }).map((item) => {
            let obj = {};
            let arr = item.split(' #---# ');
            obj.sha = arr[0];
            obj.date = arr[1].slice(0, arr[1].length - 6);
            obj.commiter = arr[2];
            obj.msg = arr[3];
            return obj;
          })
          console.log(arr)
          resolve(arr)
        }
      })
    })
  }