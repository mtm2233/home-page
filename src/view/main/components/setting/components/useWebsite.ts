/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-27 18:06:29
 * @LastEditTime: 2021-04-27 21:44:45
 * @LastEditors: mTm
 */
/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-27 18:06:29
 * @LastEditTime: 2021-04-27 18:10:48
 * @LastEditors: mTm
 */
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree'

function changeKey(data: any[]): any {
    return (
        data.map((v: any) => ({
            ...data,
            key: v.url ? `w${v.id}` : `t${v.id}`,
            title: v.name,
            children: v.children ? changeKey(v.children) : [],
        })) || []
    )
}

const dataList: TreeDataItem[] = []

function generateList(data: TreeDataItem[]): TreeDataItem[] {
    for (let i = 0; i < data.length; i++) {
        const node = data[i]
        dataList.push(node)
        if (node.children) {
            generateList(node.children)
        }
    }
    return dataList
}

function getParentKey(
    key: string,
    tree: TreeDataItem[],
): string | number | undefined {
    let parentKey
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children)
            }
        }
    }
    return parentKey
}

export { changeKey, generateList, getParentKey }
