/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 10:30:54
 * @LastEditTime: 2021-04-22 12:48:46
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

interface WebsiteList {
    name: string; 
    url: string; 
    offset: string; 
    size: string;
}

export {
    WebsiteAdd,
    WebsiteList,
}