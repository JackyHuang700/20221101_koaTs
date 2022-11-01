'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const $ = new user_controller_1.default();
module.exports = (Router) => {
    Router.post('/user/login', $.userLoginPost);
    Router.post('/user/del', $.userDelPost);
};
