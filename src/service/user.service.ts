/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-13 23:11:32
 * @LastEditTime: 2021-04-21 16:38:08
 * @LastEditors: mTm
 */
import connection from '../app/database';

import { ServiceUser, UserDto } from '../interface/class/user.interface.class';

class UserService implements ServiceUser {
  async list(name: string, offset: string, size: string) {
    const statement = `
            SELECT * FROM user WHERE name like '%${name}%' LIMIT ?, ?;
        `;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }

  async getBySub(sub: string) {
    let statement = `
            SELECT * FROM user WHERE sub = ?;
        `;
    const [result] = await connection.execute(statement, [sub]);

    if (Array.isArray(result) && result.length) {
      return result[0];
    }
  }

  async create(data: UserDto) {
    const statement = `
            INSERT INTO user (sub, name, avatar) VALUES (?, ?, ?);
        `;

    const [result] = await connection.execute(statement, [
      data.sub,
      data.name,
      data.avatar,
    ]);

    return result;
  }

  async update(data: UserDto) {
    const statement = `
            UPDATE user SET name = ?,avatar = ? WHERE sub = ?;
        `;

    const [result] = await connection.execute(statement, [
      data.name,
      data.avatar,
      data.sub,
    ]);

    return result;
  }

  async remove(id: number) {
    const statement = `
            DELETE FROM user WHERE id = ?;
        `;

    const [result] = await connection.execute(statement, [id]);

    return result;
  }
}

export default new UserService();
