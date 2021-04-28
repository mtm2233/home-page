/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-28 17:47:09
 * @LastEditTime: 2021-04-28 18:33:30
 * @LastEditors: mTm
 */
const path = require('path')

// getLessVars
const { generateTheme } = require('antd-theme-generator')

// 要动态更改的变量列表
const options = [
    '@primary-color',
    '@text-color',
    '@layout-header-background',
    '@layout-body-background',
    '@layout-footer-background',
    // '@secondary-color',
    // '@text-color-secondary',
    // '@heading-color',
    // '@btn-primary-bg',
]

generateTheme({
    antDir: path.join(__dirname, './node_modules/ant-design-vue'), //node_modules中antd的路径
    stylesDir: path.join(__dirname, './src/assets/styles'), //styles对应的目录路径
    varFile: path.join(__dirname, './src/assets/styles/variables.less'), //less变量的入口文件
    themeVariables: options,
    outputFilePath: path.join(__dirname, './public/color.less'), //生成的color.less文件的位置
    customColorRegexArray: [/^color\(.*\)$/],
})
    .then(() => {
        console.log('配置主题成功')
    })
    .catch(() => {
        console.log('配置主题失败')
    })
