import UserModel from './../model/user.model'; // 数据库模型
import ArticleModel from './../model/article.model';
('use strict');
import {CustomError} from '../utils/error_constructor';
import {Context} from 'koa';
// import db from '../model'; // 数据库模型

export default class ArticleController {
  /**
   * @api {post} /article/create
   * @apiDescription  创建文章
   * @apiName create
   * @apiGroup Api
   * @apiVersion 1.0.0
   */
  public async articleCeatePost(ctx: Context) {
    const {uid = 0, title = '', content = ''} = ctx.request.body;
    if (!uid || !title || !content) throw new CustomError('缺少参数', {msg: 'title、uid或者content缺少'});

    const result = await ArticleModel.create({
      uid,
      title,
      content,
    });

    ctx.result['data'] = {
      info: result,
    };
  }
  /**
   * @api {post} /article/update
   * @apiDescription  修改文章
   * @apiName update
   * @apiGroup Api
   * @apiVersion 1.0.0
   */
  public async articleUpdatePatch(ctx: Context) {
    const {title = '', content = '', id = 0} = ctx.request.body;
    if (!title || !content || !id)
      throw new CustomError('缺少参数', {msg: 'title、uid、id或者content缺少'});

    const result = await ArticleModel.update(
      {
        title,
        content,
      },
      {
        where: {id},
      }
    );

    ctx.result['data'] = true;
  }
  /**
   * @api {post} /article/detail
   * @apiDescription  文章详情
   * @apiName detail
   * @apiGroup Api
   * @apiVersion 1.0.0
   */
  public async articleDetailGet(ctx: Context) {
    const {id = 0} = ctx.query;
    if (!id) throw new CustomError('缺少参数', {msg: 'id缺少'});

    const result = await ArticleModel.findOne({
      attributes: {exclude: ['deletedAt', 'updateAt']},
      include: [
        {
          model: UserModel,
          attributes: ['nickname'],
          as: 'userInfo', // 别名 在app/model/index.ts 下定义
        },
      ],
      where: {id},
    });

    ctx.result['data'] = {
      info: result,
    };
  }
  /**
   * @api {post} /article/list
   * @apiDescription  查询文章 分页
   * @apiName list
   * @apiGroup Api
   * @apiVersion 1.0.0
   */
  public async articleListPost(ctx: Context) {
    const {limit = 10, offset = 0, uid = 0} = ctx.request.body;
    if (!uid) throw new CustomError('缺少参数', {msg: 'uid缺少'});

    const {rows, count} = await ArticleModel.findAndCountAll({
      attributes: {exclude: ['deletedAt', 'updateAt']},
      include: [
        {
          model: UserModel,
          attributes: ['nickname'],
          as: 'userInfo', // 别名 在app/model/index.ts 下定义
        },
      ],
      where: {uid},
      limit,
      offset,
    });

    ctx.result['data'] = {
      rows,
      count,
    };
  }
  /**
   * @api {post} /article/del
   * @apiDescription  删除文章
   * @apiName del
   * @apiGroup Api
   * @apiVersion 1.0.0
   */
  public async articleDelDelete(ctx: Context) {
    const {id = 0} = ctx.request.body;
    if (!id) throw new CustomError('缺少参数', {msg: 'id缺少'});
    await ArticleModel.destroy({
      where: {id},
    });

    ctx.result['data'] = true;
  }
}
