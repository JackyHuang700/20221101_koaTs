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
('use strict');
const utils_1 = require("../utils");
const error_constructor_1 = require("../utils/error_constructor");
class UserController {
    userLoginPost(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name = '', nickname = '', pwd = '' } = ctx.request.body;
            if (!nickname || !pwd)
                throw new error_constructor_1.CustomError('缺少参数', { msg: 'name或者pwd缺少' });
            const result = yield user_model_1.default.findOrCreate({
                where: { nickname, pwd: (0, utils_1.md5)(`${(0, utils_1.md5)(pwd)}+${nickname}`) },
            });
            ctx.result['data'] = {
                info: result[0],
            };
        });
    }
    userDelPost(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: _id = '' } = ctx.request.body;
            if (!_id)
                throw new error_constructor_1.CustomError('缺少参数', { msg: `id缺少${_id}` });
            console.log('_id ', _id);
            const _destroy = yield user_model_1.default.destroy({
                where: {
                    id: _id,
                },
            });
            if (_destroy > 0)
                console.log('刪除完成! destroy done!');
            ctx.result['data'] = {
                msg: `成功刪除${_destroy}筆!`
            };
        });
    }
}
exports.default = UserController;
