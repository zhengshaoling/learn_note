/**
 * 添加Array中包含Array判断
 * @param val
 * @returns {boolean}
 */
Array.prototype.containObj = function (val, field = 'id') {
  for (let i = 0;i<this.length;i++) {
    if (this[i][field] === val[field]) {
      return true;
    }
  }
  return false;
};

Array.prototype.indexOfObj = function (val, field = 'id') {
  let index = 0;
  for (let i = 0;i<this.length;i++) {
    // console.debug(i,this[i],this[i][field],val[field],this[i][field]===val[field]);
    if (this[i][field] === val[field]) {
      return index;
    }
    index++;
  }
  return -1;
};

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{ //author: meizz
  this.setTime(this.getTime()+8*3600*1000)
  let o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "H+" : this.getUTCHours(),                   //小时
    "m+" : this.getMinutes(),                  //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(let k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
Date.startTimeFormat = function(time){
  let d = new Date(time);
  let okTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + "00:00:00";
  return okTime;
}
Date.endTimeFormat = function(time){
  let d = new Date(time);
  let okTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + "23:59:59";
  return okTime;
}
Date.ieDateParse = function(dateString){
  //console.log(dateString)
  if(typeof dateString === typeof '') {
    dateString = dateString.replace(/\..+/g,'')
    // let d_t = dateString.split('T');
    // let d_ymd = d_t[0].split('-');
    // let t_hms = d_t[1].split(':');
    // console.log(d_t,d_ymd,t_hms);
    return new Date(dateString).Format("yyyy/MM/dd hh:mm:ss")
    // return Date.parse(dateString.replace(/-/g, '/'))
  }else {
    return dateString
  }
};

//参数：保留几位小数，货币符号，千位分隔符，小数分隔符
Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : "$";
  thousand = thousand || ",";
  decimal = decimal || ".";
  var number = this,
    negative = number < 0 ? "-" : "",
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};
