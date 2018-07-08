var Repo = require('../models/repo.js')

let a = () => {
   Repo.updateRepo('vue-tool').then(() => {}, (err) => {
    console.log('here ..... ' + err)
   })
}

// then 实现
// let t1 = () => {
//     Repo.getBranches('vue-tool').then((res) => {
//         console.log('分支:' + res)
//     }, (err) => {
//         console.log('here ..... ' + err)
//     })
// }

// await 实现
let t1 = async () => {
    var res = await Repo.getBranches('vue-tool')
    console.log('分支:' + res)
}

let t2 = async () => {
    var res = await Repo.isBranchExisted('vue-tool', 'origin/branch')
    console.log('branch分支是否存在：' + res)
}

let t3 = () => {
    var res =  Repo.isLocalExisted('vue-tool')
    console.log(res)
}

let t4 = async () => {
    var res = await Repo.getCommits('vue-tool', '2017-9-10')
    console.log('分支:' + res)
}

let t5 = async () => {
    var res = await Repo.updateRepo('git@github.com:youen123/vue-tool.git');
    console.log(res);
}
// a()
// t1()
// t2()
// t3()
t5();

