/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 10:30:54
 * @LastEditTime: 2021-04-22 10:58:35
 * @LastEditors: mTm
 */
interface WebsiteAdd {
    name: string;
    url: string;
    icon?: string;
    description?: string;
    user_id: number;
    type_id?: number;
    sort?: number;
}

export {
    WebsiteAdd
}