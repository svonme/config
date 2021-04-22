/**
 * @file 获取项目配置文件信息
 * @author svon.me@gmail.com 
 */

import Config from './config';


const config = function<T>(configName?: string): T {
  const app = new Config(configName);
  const data = app.getConfig();
  return data as T;
}

export {};

exports.default = config;

