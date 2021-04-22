/**
 * @file 简易
 * @author svon.me@gmail.com
 */

export const includes = function(value: string | Array<string | number>, key: string | number): boolean {
  if (value && value.includes) {
    return value.includes(key as any);
  }
  if (value && value.indexOf) {
    if (value.indexOf(key as any) >= 0) {
      return true;
    }
  }
  return false;
};

// 从对象中排除某些键值对数据
export const omit = function<T>(data: any, keys: string[]): T {
  const obj: any = {};
  for(const key in data) {
    if (includes(keys, key)) {
      continue;
    }
    obj[key] = data[key];
  }
  return obj;
};

