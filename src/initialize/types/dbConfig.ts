export interface Imysql {
  database: any;
  host?: string;
  user?: string;
  password?: string;
  port?: string;
}
export interface Idbconfig {
  mysql: Imysql;
  redis: object;
}
