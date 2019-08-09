function padLeftZero(str) {
  const zero = '00';
  return (zero + str).substr(str.length);
}

/**
 * 时间格式化
 *  @param {String} date 时间
 *  @param {String} fmt 时间格式，如'yyyy-MM-dd', 'yyyy-MM-dd：hh-mm-ss', 'hh:mm:ss',
 *  @return {String} 格式化后的时间字符串
 * */
export function dateFormat(time, fmt) {
  const date = new Date(time);
  const blank = '';
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + blank).substr(4 - RegExp.$1.length));
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + blank;
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}
