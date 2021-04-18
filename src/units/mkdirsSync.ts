/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-13 23:07:12
 * @LastEditTime: 2021-04-18 23:14:43
 * @LastEditors: mTm
 */
import * as fs from 'fs';
import * as path from 'path';
// 递归创建目录 同步方法
function mkdirsSync(dirname: string): boolean {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}


export default mkdirsSync;