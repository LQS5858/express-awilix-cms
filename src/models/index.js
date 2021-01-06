import fs from 'fs'

import path from 'path'
import Sequelize from 'sequelize'

const db = {}

export function initModel (sequelize) {
    fs.readdirSync(__dirname).filter(file => {
        return (file?.indexOf('.') !== -1 && file?.slice(-3) === '.js' && file !== 'index.js')
    }).forEach(file => {
        const model = sequelize.import(path.join(__dirname, file))
        db[model?.name] = model
    })
    db?.sequelize = sequelize
    db?.Sequelize = Sequelize
}