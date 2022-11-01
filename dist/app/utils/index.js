"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentPeriod = exports.getClientIp = exports.inMobile = exports.inMicroMessenger = exports.md5 = exports.sha256 = exports.sha1 = void 0;
const crypto_1 = __importDefault(require("crypto"));
const moment_1 = __importDefault(require("moment"));
const sha1 = (str) => {
    const sha1sum = crypto_1.default.createHash('sha1');
    sha1sum.update(str, 'utf8');
    str = sha1sum.digest('hex');
    return str;
};
exports.sha1 = sha1;
const sha256 = (str) => {
    return crypto_1.default.createHmac('sha256', str).update(str).digest('hex');
};
exports.sha256 = sha256;
const md5 = (str) => {
    const md5sum = crypto_1.default.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};
exports.md5 = md5;
const inMicroMessenger = (req) => {
    return req.headers['user-agent'] && req.headers['user-agent'].indexOf('MicroMessenger') > -1;
};
exports.inMicroMessenger = inMicroMessenger;
const inMobile = (req) => {
    let _inMobile = false;
    if (req.headers['user-agent']) {
        _inMobile = !!req.headers['user-agent'].toLowerCase().match(/(iphone|ipod|ipad|android)/);
    }
    return _inMobile;
};
exports.inMobile = inMobile;
const getClientIp = (req) => {
    return ((req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress).match(/\d+\.\d+\.\d+\.\d+/) || '');
};
exports.getClientIp = getClientIp;
const getCurrentPeriod = (data) => {
    const t = data.t;
    const current = data.time || new Date();
    if (t === 'day') {
        return [
            (0, moment_1.default)(current).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            (0, moment_1.default)().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        ];
    }
    else if (t === 'week') {
        return [
            (0, moment_1.default)(current).startOf('week').add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
            (0, moment_1.default)(current).endOf('week').add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
        ];
    }
    else if (t === 'month') {
        return [
            (0, moment_1.default)(current).startOf('month').format('YYYY-MM-DD HH:mm:ss'),
            (0, moment_1.default)(current).endOf('month').format('YYYY-MM-DD HH:mm:ss'),
        ];
    }
    return [];
};
exports.getCurrentPeriod = getCurrentPeriod;
