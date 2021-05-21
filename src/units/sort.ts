/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-05-21 10:06:48
 * @LastEditTime: 2021-05-21 10:59:31
 * @LastEditors: mTm
 */
export function sortResult(data: any): any {
  return Array.isArray(data)
    ? shellSort(data).map((v: any) => ({
        ...v,
        children: sortResult(v.children),
      }))
    : data;
}

// 希尔排序
function shellSort(data: any): any {
  data = data.map((v: any) => ({ ...v, sort: (v.sort && v.sort !== 0) ? 999 : v.sort }));
  const len = data.length;
  let gap = Math.floor(len / 2);
  while (gap > 0) {
    for (let i = gap; i < len; i++) {
      let temp = data[i];
      let j = i - gap;
      while (j >= 0 && data[j].sort > temp.sort) {
        data[j + gap] = data[j];
        j -= gap;
      }
      data[j + gap] = temp;
    }
    gap = Math.floor(gap / 2);
  }
  return data;
}
