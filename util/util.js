module.exports = {
    success: (data, msg = '成功') => {
        return {flag: true, data, msg};
    },
    fail: (errmsg = '失败') => {
        return {flag: false, data: null, errmsg};
    }
}