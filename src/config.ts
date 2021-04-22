/**
 * @file 百度翻译
 * @author svon.me@gmail.com
 */

const fs = require('fs');
const path = require('path');
const argv = require('@fengqiaogang/argv');
const { merge } = require('webpack-merge');
import * as _ from './lodash';


interface ConfigJSON {
  import?: string;
  [key: string]: any;
}

// 判断文件是否存在
function isExists(src: string): boolean {
  try {
    var exists = fs.existsSync(src);
    if (exists) {
      return true;
    }
  } catch (error) {
    // todo
    return false;
  }
}

function ReadFile<T>(src: string): T {
  if (isExists(src)) {
    const content = fs.readFileSync(src);
    if (content) {
      try {
        return JSON.parse(content);
      } catch (error) {
        // todo
      }
    }
  }
  return {} as T;
}

class Config {
  private configName: string
  constructor (configName: string = 'config.json') {
    this.configName = configName;
  }
  // 获取配置文件地址
  protected getProjectDir(dir: string): string {
    // 判断文件是否存在
    if (isExists(dir)) {
      // 判断是否是文件
      const stat = fs.statSync(dir);
      if (stat.isFile()) {
        // 如果是文件，则不需要拼接文件路径
        return dir;
      }
      // 拼接配置文件路径
      const src: string = path.join(dir, this.configName);
      // 判断拼接的文件是否存在
      if (isExists(src)) {
        return src;
      }
    }
    //文件不存在，则向上一层目录查找
    const value = path.join(dir, '..');
    if (dir !== value) {
      return this.getProjectDir(value)
    }
    // 找到跟目录时则停止
    return void 0;
  }
  // 获取配置文件地址
  getProjectConfig (): string {
    return this.getProjectDir(__dirname);
  }
  // 读取配置文件
  private readConfig (configSrc: string): ConfigJSON {
    const data = ReadFile<ConfigJSON>(configSrc);
    const json = _.omit<ConfigJSON>(data, ['import']);
    if (data.import) {
      let src = '';
      if (path.isAbsolute(data.import)) {
        src = path.normalize(data.import)
      } else {
        src = path.normalize(path.join(configSrc, '..', data.import));
      }
      const value = this.readConfig(src);
      return merge({}, value, json) as ConfigJSON;
    }
    return json;
  }
  getConfig (): ConfigJSON {
    const src = this.getProjectConfig();
    const data = this.readConfig(src);
    return merge({}, data, argv) as ConfigJSON;
  }
}

export default Config;


