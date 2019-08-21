function friendlyDate(dateStr) {
  let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
  let time = dateObj.getTime()
  let now = Date.now()
  let space = now - time
  let str = ''

  switch (true) {
    case space < 60000:
      str = '刚刚'
      break
    case space < 1000 * 3600:
      str = Math.floor(space / 60000) + '分钟前'
      break
    case space < 1000 * 3600 * 24:
      str = Math.floor(space / (1000 * 3600)) + '小时前'
      break
    default:
      str = Math.floor(space / (1000 * 3600 * 24)) + '天前'
  }
  return str
}

function ellipsis (value,length) {
  if (!value) return ''
  if (value.length > length) {
    return value.slice(0,length) + '...'
  }
  return value
}

export default {
  install(Vue, option) {
    Vue.prototype.friendlyDate = friendlyDate
    Vue.prototype.ellipsis = ellipsis
  }
}
