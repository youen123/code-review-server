const DB = require('../util/DB/manager.js')
const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')

// 新建仓库
let newRepo = async (remoteRepo) => {  
  let isExisted = await isValid(remoteRepo);
  if (!isExisted) {
    let res = await cloneRepo(remoteRepo)
    if (res) {
      DB.insert('Repo', {repo: remoteRepo, local: res}).catch(e => {
        console.log(e);
      });
      return true;
    } else {
      return false;
    }
  }
  return true;
}

// 获取本地仓库目录
let getLocalRepo = async (remoteRepo) => {
  let ret = await DB.select('Repo', {repo: remoteRepo}, ['local'])
  if (ret !== false && ret.length >= 1) {
    return ret[0].local
  }
  return false
}

// 生成随机串
function getRandomstr(len) {
  let str = ''
  while(len--) {
    str += Math.floor(Math.random() * 10)
  }
  return str
}

// 是否存在本地仓库
let isLocalExisted = (localPath) => {
  console.log('path'+localPath);
  return new Promise((resolve, reject) => {
    fs.access(localPath, (err) => {
      if (err) {
        resolve(false);
      } else {
        console.log('yes');

        resolve(true)
      }
    })
  })
}

// 克隆远程仓库到本地
let cloneRepo = async (remoteRepo) => {
  let strs = remoteRepo.split('/')
  let name = strs[strs.length - 1].split('.')[0]
  let repoPath = path.join(__dirname, '..', 'repos');
  let hasone = await isLocalExisted(`${repoPath}/${name}`);
  return new Promise((resolve, reject) => {
    if (hasone) {
      resolve(`${repoPath}/${name}`);
      return;
    }
    let cmd = `cd ${repoPath} && git clone ${remoteRepo}`
    exec(cmd, (err, stdout, stderr) => {
      if(err) {
        console.log('error:' + stderr);
        reject(stderr)
      } else {
        console.log('ok!' + stdout)
        resolve(`${repoPath}/${name}`)
      }
    })
  })
}

// 更新本地仓库
let updateRepo = async (remoteRepo) => {
  var localRepoPath = await getLocalRepo(remoteRepo);
  if (!localRepoPath) {
    throw new Error('false');
    return;
  }
  let cmd = `cd ${localRepoPath} && git pull`
  console.log(cmd)
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if(err) {
        console.log('error:' + stderr);
        reject(stderr)
      } else {
        console.log('ok!' + stdout)
        resolve(true)
      }
    })
  })
}
// 仓库是否合法
let isValid = async (remoteRepo) => {
  const rows = await DB.select('Repo', {repo: remoteRepo})
  return (rows === false || rows.length === 0) ? false: true
}

module.exports = {
  newRepo,
  updateRepo,
  isValid
}


