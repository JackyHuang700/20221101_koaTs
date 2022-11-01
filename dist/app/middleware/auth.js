'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_constructor_1 = require("../utils/error_constructor");
exports.default = () => {
    return (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
        const startTime = Date.now();
        try {
            ctx.result = {
                cache: false,
                success: false,
                duration: -1,
                error: null,
                data: null,
            };
            yield next();
            ctx.result.success = true;
            if (!ctx.result.data && !ctx.body)
                throw new error_constructor_1.CustomError('请求失败', { msg: '没有找到对应接口' });
        }
        catch (error) {
            const isCustomError = error instanceof error_constructor_1.CustomError;
            ctx.result.success = false;
            if (isCustomError) {
                const errorObj = {
                    message: error.message,
                    errInfo: error.errInfo,
                    request: `${ctx.method} ${ctx.path}`,
                };
                ctx.result.error = errorObj;
                ctx.status = error.status;
            }
            else {
                ctx.status = 500;
            }
        }
        finally {
            const endTime = Date.now();
            ctx.result.duration = endTime - startTime;
            if (!ctx.body)
                ctx.body = ctx.result;
        }
    });
};
