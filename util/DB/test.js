const DB = require('./manager.js')

let test = async () => {
  // let rows = await DB.select('User', {name: 'ylj'})
  let rows = await DB.select('User', {name: 'ylj'}, ['password'])

  let id = await DB.insert('User', {name: 'admin', password: 12})
  // let rows = await DB.update('User', {password: 'ylj'}, {name: 'ylj'})
  // let rows = await DB.delete('User', {name: 'admin'})
  console.log(rows)
}
test()

// DB.insert('User', {name: 'admin', password: 12})
