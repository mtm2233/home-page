/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-18 18:36:40
 * @LastEditTime: 2021-04-18 23:14:52
 * @LastEditors: mTm
 */
import * as crypto from 'crypto';

const md5password = (password: string): string => {
  const md5 = crypto.createHash('md5');
  const result = md5.update(password).digest('hex');
  return result;
}

export default md5password;

