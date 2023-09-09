import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

const db: any = {}

export function initModel(sequelize: {
  import: (arg0: string) => any
  sync: () => void
}) {
  const fileRegex: RegExp = /\.(js|ts)$/i
  const excludesFile: string[] = ['index.js', 'index.ts']
  fs.readdirSync(__dirname)
    .filter(file => fileRegex.test(file) && !excludesFile.includes(file))
    .forEach(file => {
      const model = require(path.join(__dirname, file)).default(
        sequelize,
        Sequelize
      )
      db[model.name] = model
    })
  Object.keys(db).forEach(moduleName => {
    if (db[moduleName].associate) {
      db[moduleName].associate(db)
    }
  })
  db.sequelize = sequelize
  db.Sequelize = Sequelize
  sequelize.sync()
}

export default db
