const DB = require('../util/DB/manager')

module.exports = {
  newUser({name, password}) {

  },
  isValidUser({name, password}) {
    let rows = DB.select('User', {name, password})
    if (rows === false || rows.length === 0) {
      return false
    }
    return true
  }
}
