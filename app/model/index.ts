"use strict"
// 文档 https://www.sequelize.com.cn/other-topics/typescript
// sequelize v5 https://itbilu.com/nodejs/npm/sequelize-docs-v5.html

import { Sequelize, DataTypes, SyncOptions } from "sequelize"
import glob from "glob"
import { resolve } from "path"
import _ from "lodash"
import ArticleModel from "./article.model"
import UserModel from "./user.model"

import config from "../config"

// 创建数据库流
const _sequelize: Sequelize = new Sequelize(config.db_common.dbname, config.db_common.username, config.db_common.password, {
  host: config.db_common.host,
  port: config.db_common.port,
  dialect: config.db_common.dialect,
  timezone: "+08:00",
  pool: config.db_common.pool,
  benchmark: config.db_common.benchmark,
  ...(!config.db_common.logging && { logging: false }), // 正式服取消打印sql 提高执行效率
  define: config.db_common.define, //全局的定义，会通过连接实例传递
})

let sequelize: Sequelize
const _sqlCon = 1
if (_sqlCon === 1) {
  sequelize = new Sequelize("mysql://root:fFlsxFmxXzG0G66pN15A@containers-us-west-34.railway.app:7382/railway", {
    protocol: "tcp",
  })
} else if (_sqlCon === 2) sequelize = new Sequelize("mysql://root:root@localhost:3306/blog_dev")
else if (_sqlCon === 3) {
  sequelize = new Sequelize("railway", "uroot ", "pfFlsxFmxXzG0G66pN15A ", {
    // host: 'localhost',
    host: "containers-us-west-34.railway.app",
    dialect: "mysql",
    port: 7382,
    // ssl: true,
    protocol: "TCP",
    pool: {
      max: 200,
      min: 0,
      idle: 10000,
    },
  })
}

// 模型加载
// const db: any = {};
// glob
//   .sync(resolve(__dirname, './', '**/*.model.{ts,js}'))
//   .filter(value => value.indexOf('index') === -1)
//   .map(model => {
//     let name: string = model.split('/').pop() || '';
//     name = name.replace(/\.(ts|js)/, '');
//     name = _.camelCase(name); // 驼峰
//     name = _.upperFirst(name); // User 重新命名为 UserModel
//     db[name] = require(model)(sequelize);
//   });

// console.log('---------go---------');

// (async () => {
//   sequelize.sync({alter: true});
// })();

// return UserModel;
// };

export const initDB = async () => {
  // const sequelize = new Sequelize('mysql://root:root@localhost:3306/blog_dev');

  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        comment: "真实名称",
        allowNull: true,
        defaultValue: "",
      },
      nickname: {
        type: DataTypes.STRING,
        comment: "昵称",
        allowNull: false,
        defaultValue: "",
      },
      pwd: {
        type: DataTypes.STRING,
        comment: "密码",
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      tableName: "user", // 定义表名
      sequelize,
      modelName: "user",
      paranoid: true, // 不实际删除数据库记录，而是设置一个新 deletedAt 属性，其值为当前日期 `paranoid` 仅在 `timestamps` 启用时可用
    }
  )

  ArticleModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "用户ID",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "文章标题",
        defaultValue: "",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "文章内容",
        defaultValue: "",
      },
    },
    {
      tableName: "article", // 定义表名
      sequelize,
      modelName: "article",
      paranoid: true, // 不实际删除数据库记录，而是设置一个新 deletedAt 属性，其值为当前日期 `paranoid` 仅在 `timestamps` 启用时可用
    }
  )

  // 設定 關聯
  UserModel.hasMany(ArticleModel, {
    foreignKey: "uid",
    sourceKey: "id",
    as: "artcleInfo",
  })

  // 設定關聯
  ArticleModel.belongsTo(UserModel, {
    foreignKey: "uid",
    targetKey: "id",
    as: "userInfo",
    constraints: false,
  })

  // (async () => {

  // 建立資料表，數據同步
  const _syncSetting: SyncOptions = { alter: true }
  await UserModel.sync(_syncSetting)
  await ArticleModel.sync(_syncSetting)

  // 建立假資料
  const _canRun = false
  if (_canRun) {
    const _user = await UserModel.create({
      name: "jo",
    })
    /**const _user = */ await ArticleModel.create({
      title: "標題",
      content: "內容",
      uid: _user.id,
    })
  }

  // })();

try{
  await _sequelize.authenticate()
  console.log("資料庫連接成功")

  await _sequelize.sync({
    // force: false,
    alter: true, // 是否自动更新创建表
  })
}catch(err){
  console.log("資料庫連接失敗", err)
}


}

// 数据库测试连接

// -- old --
// _sequelize
//   .authenticate() // 連接資料庫，通過嘗試驗證來測試連接
//   .then(() => {
//     console.log("資料庫連接成功")

//     _sequelize.sync({
//       // force: false,
//       alter: true, // 是否自动更新创建表
//     })
//   })
//   .catch((err: any) => {
//     console.log("資料庫連接失敗", err)
//   })

// 關聯
// const {UserModel, ArticleModel} = db;
// UserModel.hasMany(ArticleModel, {foreignKey: 'uid', targetKey: 'id', as: 'artcleInfo'});

// ArticleModel.belongsTo(UserModel, {
//   foreignKey: 'uid',
//   targetKey: 'id',
//   as: 'userInfo',
//   constraints: false,
// });

// export default sequelize;
