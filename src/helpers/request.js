import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
// axios.defaults.withCredentials = true

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type
    }
    if (type.toLowerCase() === 'get') {
      option.params = data
    } else {
      option.data = data
    }
    axios(option)
      .then(res => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          Message.error(res.status)
          reject(res.status)
        }
      }).catch(err => {
        Message.error('网络错误')
        reject({ msg: '网络错误' })
      })
  })
}