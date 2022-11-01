import UserModel from './../model/user.model'; // 数据库模型
import {Context} from 'koa';
('use strict');
import {md5} from '../utils';
import {CustomError} from '../utils/error_constructor';

export default class UserController {
  /**
   * @api {post} /user/login
   * @apiDescription  用户登录或者注册
   * @apiName login
   * @apiGroup Api
   * @apiVersion 1.0.0
   */
  public async userLoginPost(ctx: Context) {
    const {name = '', nickname = '', pwd = ''} = ctx.request.body;

    if (!nickname || !pwd) throw new CustomError('缺少参数', {msg: 'name或者pwd缺少'});

    // 创建用户或者查询用户
    const result = await UserModel.findOrCreate({
      // defaults: {name},
      where: {nickname, pwd: md5(`${md5(pwd)}+${nickname}`)},
    });

    ctx.result['data'] = {
      info: result[0],
    };
  }

  /** 刪除使用者 */
  public async userDelPost(ctx: Context) {
    // console.log('ctx.request.body: ', ctx.request.body);
    const {id: _id = ''} = ctx.request.body;
    if (!_id) throw new CustomError('缺少参数', {msg: `id缺少${_id}`});
    console.log('_id ', _id);

    const _destroy = await UserModel.destroy({
      where: {
        id: _id,
      },
    }); /**.then(msg => console.log('刪除完成! destroy done!', msg)); */

    if (_destroy > 0) console.log('刪除完成! destroy done!');

    // .then(user => {
    //   console.log('刪除使用者', user);
    //   user!.destroy().then(() => {
    //     console.log('刪除完成! destroy done!');
    //   });
    // });

    // if (_user !== null) {
    //   _user.destroy();
    // }
  }
}
