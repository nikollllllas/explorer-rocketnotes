const sqliteConnection = require('../../sqlite')
const createUsers =  require('./createUsers')

async function runMigrations() {
  const schemas = [
    createUsers
  ].join('')

  sqliteConnection()
    .then(async db => {
      await db.exec(schemas)
    })
    .catch(e => console.log(e))
}

module.exports = runMigrations