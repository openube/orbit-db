'use strict'

const OrbitDB = require('../OrbitDB')

const typeToClass = (orbitdb, type) => {
  switch (type.toLowerCase()) {
    case 'eventlog':
      return orbitdb.eventlog
      break
    case 'docstore':
      return orbitdb.docstore
      break
    case 'counter':
      return orbitdb.counter
      break
    case 'kvstore':
      return orbitdb.kvstore
      break
    case 'feed':
      return orbitdb.feed
      break
    default:
      return null
      break
  }
}

const initDatabase = (ipfs, databasePath, type, argv) => {
  const orbitdb = new OrbitDB(ipfs)
  const database = typeToClass(orbitdb, type)
  
  if (!database)
    throw new Error('Database type must be defined')

  const db = database.bind(orbitdb)(argv.dbname, { 
    maxHistory: argv.limit || -1,
    cachePath: databasePath,
    indexBy: argv.indexBy,
  })
  return db
}

module.exports = initDatabase
