// const exec = require('child_process').exec
let { exec } = require('../util/util')

// 获取某个仓库分支的提交
let getBranchCommits = async (localRepoPath, branch, since) => {
    let cmd = `cd ${localRepoPath} && git log --pretty=format:"%h #---# %ad #---# %cn #---# %s" --date=iso`
    if (since) {
        cmd += ` --since=${since}`;
    }
    console.log(cmd);
    try {
        let preExec = await exec(`cd ${localRepoPath} && git checkout ${branch}`);
        let ret = await exec(cmd);
        return {
            flag: true,
            res: ret.split('\n').filter((item) => {
                return item !== ''
            }).map((item) => {
                let obj = {};
                let arr = item.split(' #---# ');
                console.log(arr);
                obj.sha = arr[0];
                obj.date = arr[1].slice(0, arr[1].length - 6);
                obj.commiter = arr[2];
                obj.msg = arr[3];
                return obj;
            })
        }
    } catch (err) {
        console.log(err.message);
        return {
            flag: false,
            errmsg: err.message || 'failed'
        }
    }
}

let getCommitTime = (stdout) => {
    var arr = stdout.split('\n');
    let info = arr[0];
    let obj = {};
    arr = info.split(' #---# ');
    obj.sha = arr[0];
    obj.date = arr[1].slice(0, arr[1].length - 6);
    obj.commiter = arr[2];
    obj.msg = arr[3];
    return obj;
}
// 获取某个提交的时间
let getCommitInfo = async(localRepoPath, branch) => {
    let cmd = `cd ${localRepoPath} && git checkout ${branch} && git show --pretty=format:"%h #---# %ad #---# %cn #---# %s" --date=iso`
    console.log(cmd)
    try {
        let ret = await exec(cmd);
        return {
            flag: true,
            res: getCommitTime(ret)
        }
    } catch (err) {
        return {
            flag: false,
            errmsg: err.message || 'failed'
        }
    }
}

module.exports = {
    getBranchCommits,
    getCommitInfo
}
