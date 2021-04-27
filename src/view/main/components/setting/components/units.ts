/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-27 18:06:29
 * @LastEditTime: 2021-04-27 18:10:57
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

const x = 3
const y = 2
const z = 1
const genData: TreeDataItem[] = []

function generateData(
    _level: number,
    _preKey?: string,
    _tns?: TreeDataItem[],
): any {
    const preKey = _preKey || '0'
    const tns = _tns || genData

    const children = []
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`
        tns.push({ title: key, key })
        if (i < y) {
            children.push(key)
        }
    }
    if (_level < 0) {
        return tns
    }
    const level = _level - 1
    children.forEach((key, index) => {
        tns[index].children = []
        return generateData(level, key, tns[index].children)
    })
}

generateData(z)

const dataList: TreeDataItem[] = []
const generateList = (data: TreeDataItem[]) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const key = node.key
        dataList.push({ key, title: key as string })
        if (node.children) {
            generateList(node.children)
        }
    }
}
generateList(genData)

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

export { genData, dataList, getParentKey }
