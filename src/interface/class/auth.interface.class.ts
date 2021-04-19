/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-19 09:28:52
 * @LastEditTime: 2021-04-19 09:44:02
 * @LastEditors: mTm
 */
interface ServiceAuth {
    isExists(tableName: string, id: number): Promise<boolean>;
    authPermission(tableName: string, id: number, userId: number): Promise<boolean>;
}

export {
    ServiceAuth
}