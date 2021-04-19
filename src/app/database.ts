/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-13 23:08:16
 * @LastEditTime: 2021-04-19 12:01:14
 * @LastEditors: mTm
 */
import * as mysql from 'mysql2';
import { PoolConnection } from 'mysql2'

import * as config from './config';

const connections = mysql.createPool({
    host: config.MYSQL_HOST,
    port: Number(config.MYSQL_PORT),
    database: config.MYSQL_DATABASE,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD
})

connections.getConnection((err: Error, conn: PoolConnection) => {
    conn.connect((err: Error) => {
        if(err) {
            console.log('数据库连接失败~', err);
        } else {
            console.log('数据库连接成功~');
        }
    })
})


export default connections.promise();
