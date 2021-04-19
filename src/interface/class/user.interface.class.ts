/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-19 09:46:30
 * @LastEditTime: 2021-04-19 09:59:53
 * @LastEditors: mTm
 */
// import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2'

interface ServiceUser {
    list(name: string, offset: string, size: string): Promise<any>;
}

interface ControllerUser {
    list(ctx: any, next: () => Promise<any>): Promise<any>;
}

export {
    ServiceUser,
    ControllerUser,
}