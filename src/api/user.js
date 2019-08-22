import request from '@/helpers/request.js'

let URL = {
  GET_USER_BY_NAME: '/user/:loginname',
}

export default {
  getUserByName({ loginname }) {
    return request(URL.GET_USER_BY_NAME.replace(':loginname', loginname))
  }
}