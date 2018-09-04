const DB = require('../util/DB/manager')

module.exports = {
  newUser({name, password}) {

  },
  async isValidUser({name, password}) {
    let rows = await DB.select('User', {name, password})
    console.log(rows);
    if (rows === false || rows.length === 0) {
      return false
    }
    return true
  }
}
