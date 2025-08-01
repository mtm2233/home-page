/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-19 09:46:30
 * @LastEditTime: 2021-04-19 09:59:53
 * @LastEditors: mTm
 */
// import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2'

interface UserDto {
    sub: string
    name: string
    avatar?: string
}

interface ServiceUser {
    list(name: string, offset: string, size: string): Promise<any>;
    getBySub(sub: string): Promise<any>;
    create(data: UserDto): Promise<any>;
    update(data: UserDto): Promise<any>;
    remove(id: number): Promise<any>;
}

interface ControllerUser {
    list(ctx: any, next: () => Promise<any>): Promise<any>;
    oauthLogin(ctx: any, next: () => Promise<any>): Promise<any>;
}

export {
    UserDto,
    ServiceUser,
    ControllerUser,
}