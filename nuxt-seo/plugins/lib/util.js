/*
 * @Author: linglingling
 * @Date: 2021-09-17 09:35:18
 * @LastEditTime: 2021-09-17 09:35:38
 * @LastEditors: linglingling
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-seo\plugins\lib\util.js
 */

/**
 * 对象深拷贝
 */
export const deepClone = data => {
var type = getObjType(data)
var obj
if (type === 'array') {
        obj = []
} else if (type === 'object') {
        obj = {}
} else {
        // 不再具有下一层次
        return data
}
if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
        obj.push(deepClone(data[i]))
        }
} else if (type === 'object') {
        for (var key in data) {
        obj[key] = deepClone(data[key])
        }
}
return obj
}

/**
 * 获取变量类型
 */
export const getObjType = obj => {
var toString = Object.prototype.toString
var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
}
if (obj instanceof Element) {
        return 'element'
}
return map[toString.call(obj)]
}

/**
 * 转化时间格式
 */
export const parseTime = (time, cFormat) => {
if (arguments.length === 0) {
        return null
}
const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
let date
if (typeof time === 'object') {
        date = time
} else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
}
const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
};
const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        let value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        if (result.length > 0 && value < 10) {
        value = '0' + value
        }
        return value || 0
});
return time_str
}