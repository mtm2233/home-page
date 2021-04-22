/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 10:30:54
 * @LastEditTime: 2021-04-22 17:25:24
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
    user_id: number,
}

interface WebsiteUpdate {
    name?: string;
    url?: string;
    icon?: string;
    description?: string;
    user_id?: number;
    type_id?: number;
    sort?: number;
}

export {
    WebsiteAdd,
    WebsiteList,
    WebsiteUpdate,
}