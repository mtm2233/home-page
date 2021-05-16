/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-05-16 21:59:43
 * @LastEditTime: 2021-05-16 22:38:56
 * @LastEditors: mTm
 */
import connection from "../app/database";

import { ServiceTheme } from "../interface/class/theme.interface.class";
import { Theme } from "../interface/theme.interface";

class ThemeService implements ServiceTheme {
  async detail(userId: number) {
    const statement = `
        SELECT primary_color, primary_bg FROM theme WHERE user_id = ?;
    `;
    const [result] = await connection.execute(statement, [userId]);
    if (Array.isArray(result)) {
      return result[0] || {};
    }
    return {};
  }

  async update(userId: number, theme: Theme) {
    const { primary_color = null, primary_bg = null } = theme;
    let statement = `INSERT INTO theme (user_id, primary_color, primary_bg) VALUES (?, ?, ?);`;
    const is_exist = await this.isExist(userId);
    if (is_exist) {
      statement = `UPDATE theme SET primary_color = ?, primary_bg = ? WHERE user_id = ?;`;
    }
    const [result] = await connection.execute(
      statement,
      is_exist
        ? [primary_color, primary_bg, userId]
        : [userId, primary_color, primary_bg]
    );
    return result;
  }

  async isExist(userId: number) {
    const statement = `SELECT * FROM theme WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    if (Array.isArray(result) && result.length) {
      return true;
    }
    return false;
  }
}

export default new ThemeService();
