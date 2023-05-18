export interface Imysql {
  database: any;
}
export interface Idbconfig {
  mysql: Imysql;
  redis: object;
}
