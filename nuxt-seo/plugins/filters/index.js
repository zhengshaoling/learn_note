/*
 * @Author: linglingling
 * @LastEditTime: 2021-09-17 10:29:53
 * @FilePath: \nuxt-seo\plugins\filters\index.js
 */
import { parseTime } from '~/plugins/lib/util'


// 时间戳转换日期
const YmdDate = time => {
  if (!time) {
    return;
  }
  const date = new Date(time);
  return parseTime(date, "{y}-{m}-{d}");
};

// 时间戳转换日期时分秒
const YmdHisDate = time => {
  if (!time) {
    return;
  }
  const date = new Date(time);
  return parseTime(date, "{y}-{m}-{d} {h}:{i}:{s}");
};
// 手机号码过滤器 隐藏中间部分
const tellFormat = tel => {
  if(!tel) return '***';
  let start = tel.slice(0,4);
  let end = tel.slice(-2);
  return `${start}******${end}`;
}
// 邮箱过滤器
const emailFormat = mail => {
  if(!mail) return '***';
  let start = mail.slice(0,4);
  let end = mail.slice(-6);
  return `${start}******${end}`;
}



export default {
  YmdDate,
  YmdHisDate,
  tellFormat,
  emailFormat
}
