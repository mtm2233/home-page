/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-13 23:07:12
 * @LastEditTime: 2021-04-13 23:07:21
 * @LastEditors: mTm
 */
const fs = require("fs");
const path = require("path");
// 递归创建目录 同步方法
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

module.exports = mkdirsSync;