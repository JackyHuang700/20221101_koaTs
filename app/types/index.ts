import {Dialect} from 'sequelize/types';

/** === DB === */
export interface IDB_Article {}
export interface IDB_User {}
/** end.=== DB === */

export interface IAsadfasd {
  redis_common: {
    port: number;
    host: string;
    password: string;
  };
  db_common: {
    host: string;
    port: number;
    dbname: string;
    username: string;
    password: string;
    dialect: Dialect;
    logging: boolean;
    benchmark: boolean;
    define: {
      timestamps: boolean;
      freezeTableName: boolean;
    };
    pool: {
      max: number;
      min: number;
      idle: number;
    };
  };
}

export interface IDSsaf {
  name: string;
  port: string;
}
