const Diff = require('../models/diff.js');
const Repo = require('../models/repo.js');
const {success, fail} = require('../util/util.js');

module.exports = {
  getDiffFileList(repo, branch1, branch2) {

  },
  getDiffFileHTML: async (ctx) => {
    let {repo, commit1, commit2, file} = ctx.request.query;
    let localRepo = await Repo.getLocalRepo(repo);
    let res = await Diff.get2CommitDiffFile(localRepo, commit1, commit2, file);
    ctx.response.body = res.flag? success(res.res) : fail(res && res.errmsg);
  },
  
  getDiffFileJson: async (ctx) => {
    let {repo, commit1, commit2, file} = ctx.request.query;
    let localRepo = await Repo.getLocalRepo(repo);
    let res = await Diff.get2CommitDiffJSON(localRepo, commit1, commit2, file);
    ctx.response.body = res.flag? success(res.res) : fail(res && res.errmsg);
  },
  getDiffFileListOfSameBranch: async (ctx) => {
    let {repo, branch, commit1, commit2} = ctx.request.query;
    let localRepo = await Repo.getLocalRepo(repo);
    let res = await Diff.get2CommitDiffFileList(localRepo, branch, commit1, commit2);
    ctx.response.body = res.flag? success(res.res) : fail(res && res.errmsg);
  }
}
