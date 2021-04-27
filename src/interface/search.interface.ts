/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 18:24:07
 * @LastEditTime: 2021-04-27 23:28:41
 * @LastEditors: mTm
 */
interface SearchAdd {
    name: string;
    website: string;
    search_key: string;
    icon?: string;
    description?: string;
    extra_key?: string;
    placeholder?: string;
}

interface SearchEdit {
    name?: string;
    website?: string;
    search_key?: string;
    icon?: string;
    description?: string;
    user_id?: number;
    extra_key?: string;
    placeholder?: string;
}

export {
    SearchAdd,
    SearchEdit,
}