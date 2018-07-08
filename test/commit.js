var Commit = require('../models/commit.js')

var localRepoPath = '/Users/youlujie/Documents/coding/code-review-server/repos/vue-tool';

var branch = 'branch';

let t = async () => {
    
}

let t1 = async () => {
    var res = await Commit.getBranchCommits(localRepoPath, branch, '2017-9-5');
    console.log(res);
    return res;
}

let t2 = async () => {
    var res = await Commit.getCommitInfo(localRepoPath, branch, 'e8bfab8083fa');
    console.log(res);
    return res;
} 
t2();
