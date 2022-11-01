'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const path_1 = require("path");
exports.default = (Router) => {
    glob_1.default
        .sync((0, path_1.resolve)(__dirname, './', '**/*.route.{ts,js}'))
        .filter(value => value.indexOf('index') === -1)
        .map(router => {
        require(router)(Router);
    });
};
