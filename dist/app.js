'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./app/config"));
const redis_1 = __importDefault(require("./app/utils/redis"));
if (false)
    (0, redis_1.default)('myblog-ts_modules', config_1.default.redis_common);
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const auth_1 = __importDefault(require("./app/middleware/auth"));
const routers_1 = __importDefault(require("./app/routers"));
const app = new koa_1.default();
const router = new koa_router_1.default();
app.use((0, koa2_cors_1.default)({
    credentials: true,
    exposeHeaders: ['*'],
}));
app.use((0, koa_bodyparser_1.default)());
app.use((0, auth_1.default)());
(0, routers_1.default)(router);
app.use(router.routes());
app.listen(config_1.default.port, () => {
    console.log(`Server running on port ${config_1.default.port}`);
});
