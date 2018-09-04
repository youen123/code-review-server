var Diff = require('../models/diff.js')

var localRepoPath = '/Users/youlujie/Documents/coding/code-review-server/repos/vue-tool';

let t1 =  async () => {
    var res =  await Diff.get2CommitDiffFileList(localRepoPath, 'd95fd630f43', 'e8bfab8083fa3')
    console.log(res)
}

let t2 =  async () => {
    var res =  await Diff.get2BranchDiffFile(localRepoPath, 'branch', 'master', 'README.md')
    console.log(res)
}

let t3 = async () => {
    var res =  await Diff.get2BranchDiffFileList(localRepoPath, 'branch', 'master')
    console.log(res)
}
let t4 =  async () => {
    var res =  await Diff.get2CommitDiffFile(localRepoPath, 'd95fd630f43', 'e8bfab8083fa3', 'README.md')
    console.log(res)
}


t4()