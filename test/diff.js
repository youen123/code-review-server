var Diff = require('../models/diff.js')

let t3 = () => {
    var res =  Diff.getDiffFileList('vue-tool', 'branch', 'master')
    console.log(res)
}

t3()