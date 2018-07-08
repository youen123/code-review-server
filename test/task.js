var Task = require('../models/task.js')

let t = async () => {
    res = await Task.getAllList();
    console.log(res);
    return res;
}

t();