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
const user_model_1 = __importDefault(require("./../model/user.model"));
const article_model_1 = __importDefault(require("./../model/article.model"));
('use strict');
const error_constructor_1 = require("../utils/error_constructor");
class ArticleController {
    articleCeatePost(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid = 0, title = '', content = '' } = ctx.request.body;
            if (!uid || !title || !content)
                throw new error_constructor_1.CustomError('缺少参数', { msg: 'title、uid或者content缺少' });
            const result = yield article_model_1.default.create({
                uid,
                title,
                content,
            });
            ctx.result['data'] = {
                info: result,
            };
        });
    }
    articleUpdatePatch(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title = '', content = '', id = 0 } = ctx.request.body;
            if (!title || !content || !id)
                throw new error_constructor_1.CustomError('缺少参数', { msg: 'title、uid、id或者content缺少' });
            const result = yield article_model_1.default.update({
                title,
                content,
            }, {
                where: { id },
            });
            ctx.result['data'] = true;
        });
    }
    articleDetailGet(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ctx: ', ctx.query);
            const { id = 0 } = ctx.query;
            if (!id)
                throw new error_constructor_1.CustomError('缺少参数', { msg: 'id缺少' });
            const result = yield article_model_1.default.findOne({
                attributes: { exclude: ['deletedAt', 'updateAt'] },
                include: [
                    {
                        model: user_model_1.default,
                        attributes: ['nickname'],
                        as: 'userInfo',
                    },
                ],
                where: { id },
            });
            ctx.result['data'] = {
                info: result,
            };
        });
    }
    articleListPost(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = 10, offset = 0, uid = 0 } = ctx.request.body;
            if (!uid)
                throw new error_constructor_1.CustomError('缺少参数', { msg: 'uid缺少' });
            const { rows, count } = yield article_model_1.default.findAndCountAll({
                attributes: { exclude: ['deletedAt', 'updateAt'] },
                include: [
                    {
                        model: user_model_1.default,
                        attributes: ['nickname'],
                        as: 'userInfo',
                    },
                ],
                where: { uid },
                limit,
                offset,
            });
            ctx.result['data'] = {
                rows,
                count,
            };
        });
    }
    articleDelDelete(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id = 0 } = ctx.request.body;
            if (!id)
                throw new error_constructor_1.CustomError('缺少参数', { msg: 'id缺少' });
            yield article_model_1.default.destroy({
                where: { id },
            });
            ctx.result['data'] = true;
        });
    }
}
exports.default = ArticleController;
