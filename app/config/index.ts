'use strict';
import {IAsadfasd, IDSsaf} from '../types';
import api from './env/api';
import dev from './env/dev';

let config: IDSsaf = {
  name: 'koa-ts',
  port: '3000', // 端口号
};

// 判断环境导入不同配置
if (process.env.NODE_ENV === 'api') {
  config = {...config, ...api};
} else {
  config = {...config, ...dev};
}

export default config as IDSsaf & IAsadfasd;
