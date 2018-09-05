const Diff = require('../models/diff.js');
const Repo = require('../models/repo.js');

module.exports = {
  getDiffFileList(repo, branch1, branch2) {

  },
  getDiffFileHTML: async (ctx) => {
    let {repo, commit1, commit2, file} = ctx.request.query;
    let localRepo = await Repo.getLocalRepo(repo);
    let res = await Diff.get2CommitDiffFile(localRepo, commit1, commit2, file);
    ctx.response.body = {flag: true, data: res , msg: '成功'}
  },
  getDiffFileListOfSameBranch: async (ctx) => {
    let {repo, branch, commit1, commit2} = ctx.request.query;
    let localRepo = await Repo.getLocalRepo(repo);
    let res = await Diff.get2CommitDiffFileList(localRepo, branch, commit1, commit2);
    ctx.response.body = {flag: true, data: res , msg: '成功'}
  }
}
