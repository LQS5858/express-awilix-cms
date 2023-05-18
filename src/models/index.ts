import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

const db: any = {};

export function initModel(sequelize: {
  import: (arg0: string) => any;
  sync: () => void;
}) {
  fs.readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== -1 &&
        file.slice(-3) === ".js" &&
        file !== "index.js"
    )
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      (db as any)[model.name] = model;
    });
  Object.keys(db).forEach((moduleName: string) => {
    if (db[moduleName].associate) {
      db[moduleName].associate(db);
    }
  });
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  sequelize.sync();
}

export default db;
