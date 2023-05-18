// 创建并初始化sequelize

import Sequelize from "sequelize";

import jstz from "jstz";
import { Imysql } from "./types/dbConfig";

let sequelize;

const defaultConfig = {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  operatorsAliases: 0,
  define: {
    updatedAt: "update_at",
    createdAt: "created_date",
  },
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: jstz.determine().name(),
};

export function initSequelize(config: Imysql) {
  const { host, database, user, password, port } = config || {};
  sequelize = new (Sequelize as any)(
    database,
    user,
    password,
    Object.assign({}, defaultConfig, { host, port })
  );
  return sequelize;
}

export default sequelize;
