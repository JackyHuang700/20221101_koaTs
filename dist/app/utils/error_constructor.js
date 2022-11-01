'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(m, info, status) {
        super(m);
        this.status = 500;
        this.errInfo = info || {};
        if (status)
            this.status = status;
    }
}
exports.CustomError = CustomError;
