'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    redis_common: {
        port: 6379,
        host: '127.0.0.1',
        password: '123456',
    },
    db_common: {
        host: '127.0.0.1',
        port: 3306,
        dbname: 'blog_dev',
        username: 'root',
        password: 'root',
        dialect: 'mysql',
        logging: true,
        benchmark: true,
        define: {
            timestamps: true,
            freezeTableName: true,
        },
        pool: {
            max: 200,
            min: 0,
            idle: 10000,
        },
    },
};
