"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const sequelize_1 = require("sequelize");
const article_model_1 = __importDefault(require("./article.model"));
const user_model_1 = __importDefault(require("./user.model"));
const config_1 = __importDefault(require("../config"));
const _sequelize = new sequelize_1.Sequelize(config_1.default.db_common.dbname, config_1.default.db_common.username, config_1.default.db_common.password, Object.assign(Object.assign({ host: config_1.default.db_common.host, port: config_1.default.db_common.port, dialect: config_1.default.db_common.dialect, timezone: "+08:00", pool: config_1.default.db_common.pool, benchmark: config_1.default.db_common.benchmark }, (!config_1.default.db_common.logging && { logging: false })), { define: config_1.default.db_common.define }));
let sequelize;
const _sqlCon = 1;
if (_sqlCon === 1) {
    sequelize = new sequelize_1.Sequelize("mysql://root:fFlsxFmxXzG0G66pN15A@containers-us-west-34.railway.app:7382/railway", {
        protocol: 'tcp'
    });
}
else if (_sqlCon === 2)
    sequelize = new sequelize_1.Sequelize("mysql://root:root@localhost:3306/blog_dev");
else if (_sqlCon === 3) {
    sequelize = new sequelize_1.Sequelize('railway', 'uroot ', 'pfFlsxFmxXzG0G66pN15A ', {
        host: 'containers-us-west-34.railway.app',
        dialect: 'mysql',
        port: 7382,
        protocol: 'TCP',
        pool: {
            max: 200,
            min: 0,
            idle: 10000,
        }
    });
}
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    user_model_1.default.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            comment: "真实名称",
            allowNull: true,
            defaultValue: "",
        },
        nickname: {
            type: sequelize_1.DataTypes.STRING,
            comment: "昵称",
            allowNull: false,
            defaultValue: "",
        },
        pwd: {
            type: sequelize_1.DataTypes.STRING,
            comment: "密码",
            allowNull: false,
            defaultValue: "",
        },
    }, {
        tableName: "user",
        sequelize,
        modelName: "user",
        paranoid: true,
    });
    article_model_1.default.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        uid: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            comment: "用户ID",
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            comment: "文章标题",
            defaultValue: "",
        },
        content: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            comment: "文章内容",
            defaultValue: "",
        },
    }, {
        tableName: "article",
        sequelize,
        modelName: "article",
        paranoid: true,
    });
    user_model_1.default.hasMany(article_model_1.default, {
        foreignKey: "uid",
        sourceKey: "id",
        as: "artcleInfo",
    });
    article_model_1.default.belongsTo(user_model_1.default, {
        foreignKey: "uid",
        targetKey: "id",
        as: "userInfo",
        constraints: false,
    });
    const _syncSetting = { alter: true };
    yield user_model_1.default.sync(_syncSetting);
    yield article_model_1.default.sync(_syncSetting);
    const _canRun = false;
    if (_canRun) {
        const _user = yield user_model_1.default.create({
            name: "jo",
        });
        yield article_model_1.default.create({
            title: "標題",
            content: "內容",
            uid: _user.id,
        });
    }
});
exports.initDB = initDB;
_sequelize
    .authenticate()
    .then(() => {
    console.log("資料庫連接成功");
    _sequelize.sync({
        alter: true,
    });
})
    .catch((err) => {
    console.log("資料庫連接失敗", err);
});
