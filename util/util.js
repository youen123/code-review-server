const exec = require('child_process').exec

module.exports = {
    success: (data, msg = '成功') => {
        return { flag: true, data, msg };
    },
    fail: (errmsg = '失败') => {
        return { flag: false, data: null, errmsg };
    },
    exec: (cmd) => {
        return new Promise((resolve, reject) => {
            exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    console.log('error:' + stderr);
                    reject(stderr)
                } else {
                    resolve(stdout)
                }
            })
        });
    }
}