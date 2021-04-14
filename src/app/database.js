/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-13 23:08:16
 * @LastEditTime: 2021-04-14 23:11:33
 * @LastEditors: mTm
 */
const mysql = require('mysql2');

const config = require('./config')

const connections = mysql.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    database: config.MYSQL_DATABASE,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD
})

connections.getConnection((err,conn) => {
    conn.connect(err => {
        if(err) {
            console.log('数据库连接失败~', err);
        } else {
            console.log('数据库连接成功~');
        }
    })
})


module.exports = connections.promise();
