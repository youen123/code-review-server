
const mysql = require('mysql')
const wrapper = require('co-mysql')
const config = require('../../conf/db')

const pool = mysql.createPool(config.mysql)
const p = wrapper(pool)
const exec = (sql, vals) => {
  return p.query(sql, vals).catch((err) => {
    console.log('there is something wrong!')
    console.log(err);
    return false
  })
}
module.exports = {
  select: function(table, where, field = '*') {
    if (Array.isArray(field)) {
      field = field.join(',')
    }
    let sql = `SELECT ${field} FROM ${table} WHERE 1 = 1`
    let vals = []
    for (let key in where) {
      sql += ` AND ${key} = ?`
      vals.push(where[key])
    }
    console.log(sql)
    console.log(vals)
    return exec(sql, vals).then((res) => {
      return res;
    })
  },
  insert(table, param) {
    let sql = `INSERT INTO ${table} SET ?`
    return exec(sql, param).then((res) => {
      return res.insertId
    })
  },
  delete(table, where) {
    let sql = `DELETE FROM ${table} WHERE`
    let vals = []
    for (let key in where) {
      sql += ` ${key} = ? and`
      vals.push(where[key])
    }
    sql = sql.substr(0, sql.length - 3)
    return exec(sql, vals).then((res) => {
      return res.affectedRows
    })
  },
  update(table, param, where) {
    let sql = `UPDATE ${table} SET`
    let vals = []
    for (let key in param) {
      sql += ` ${key} = ? and`
      vals.push(param[key])
    }
    sql = sql.substr(0, sql.length - 4)
    sql += ' WHERE'
    for (let key in where) {
      sql += ` ${key} = ? and`
      vals.push(where[key])
    }
    sql = sql.substr(0, sql.length - 4)
    console.log(sql)
    console.log(vals)
    return exec(sql, vals).then((res) => {
      return res.affectedRows
    }, (err) => {
      return err
    })
  }
}
