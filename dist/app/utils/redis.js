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
const ioredis_1 = __importDefault(require("ioredis"));
const redisClient = {};
exports.default = (sid, redisCommon) => {
    if (redisClient[sid]) {
        return redisClient[sid];
    }
    if (!redisCommon) {
        throw new Error('异常错误，redis尚未初始化');
    }
    class RedisStore extends ioredis_1.default {
        _get(val) {
            const _super = Object.create(null, {
                get: { get: () => super.get }
            });
            return __awaiter(this, void 0, void 0, function* () {
                let data = yield _super.get.call(this, `${sid}:${val.key}`);
                if (data) {
                    data = JSON.parse(data);
                }
                else {
                    data = null;
                }
                return data;
            });
        }
        _set(val) {
            const _super = Object.create(null, {
                set: { get: () => super.set }
            });
            return __awaiter(this, void 0, void 0, function* () {
                if (val.expiryMode && val.time) {
                    yield _super.set.call(this, `${sid}:${val.key}`, JSON.stringify(val.value), val.expiryMode, val.time);
                }
                else {
                    yield _super.set.call(this, `${sid}:${val.key}`, JSON.stringify(val.value));
                }
                return true;
            });
        }
        _pexpireat(val) {
            const _super = Object.create(null, {
                pexpireat: { get: () => super.pexpireat }
            });
            return __awaiter(this, void 0, void 0, function* () {
                const ss = yield _super.pexpireat.call(this, `${sid}:${val.key}`, val.timestamp);
                return !!ss;
            });
        }
        _del(val) {
            const _super = Object.create(null, {
                del: { get: () => super.del }
            });
            return __awaiter(this, void 0, void 0, function* () {
                return _super.del.call(this, `${sid}:${val.key}`);
            });
        }
    }
    redisClient[sid] = new RedisStore(Object.assign(Object.assign({ port: redisCommon.port, host: redisCommon.host }, (redisCommon.password && { password: redisCommon.password })), { db: redisCommon.db || 0 }));
    return redisClient[sid];
};
