var Branch = require('../models/branch.js')

var localRepoPath = '/Users/youlujie/Documents/coding/code-review-server/repos/vue-tool';

let t = async () => {
    
}

let t1 = async () => {
    var res = await Branch.getBranches(localRepoPath);
    console.log(res);
    return res;
}

let t2 = async () => {
    var res = await Branch.isBranchExisted(localRepoPath, 'branch');
    console.log(res);
    return res;
} 
t2();
