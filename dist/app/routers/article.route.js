'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const article_controller_1 = __importDefault(require("../controller/article.controller"));
const $ = new article_controller_1.default();
module.exports = (Router) => {
    Router.post('/article/create', $.articleCeatePost)
        .patch('/article/update', $.articleUpdatePatch)
        .get('/article/detail', $.articleDetailGet)
        .post('/article/list', $.articleListPost)
        .delete('/article/del', $.articleDelDelete);
};
