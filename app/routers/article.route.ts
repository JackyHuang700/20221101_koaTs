'use strict';
import ArticleController from '../controller/article.controller';
const $ = new ArticleController();

module.exports = (Router: any): void => {
  Router.post('/article/create', $.articleCeatePost) // 创建文章
    .patch('/article/update', $.articleUpdatePatch) // 文章修改
    .get('/article/detail', $.articleDetailGet) // 文章详情
    .post('/article/list', $.articleListPost) // 文章列表 分页
    .delete('/article/del', $.articleDelDelete); // 删除文章
};
