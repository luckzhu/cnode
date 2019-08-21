import request from '@/helpers/request.js'

let URL = {
  GET_TOPICS: '/topics ',
  GET_TOPIC_BY_ID: '/topic/:id',
}

export default {
  getTopics() {
    return request(URL.GET_TOPICS, 'GET')
  },
  getTopicById({ id }) {
    return request(URL.GET_TOPIC_BY_ID.replace(':id', id))
  }
}