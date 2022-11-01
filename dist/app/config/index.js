'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("./env/api"));
const dev_1 = __importDefault(require("./env/dev"));
let config = {
    name: 'koa-ts',
    port: '3000',
};
if (process.env.NODE_ENV === 'api') {
    config = Object.assign(Object.assign({}, config), api_1.default);
}
else {
    config = Object.assign(Object.assign({}, config), dev_1.default);
}
exports.default = config;
