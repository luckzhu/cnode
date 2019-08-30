import user from '@/api/user'
import { Message } from 'element-ui'



export default {
  state: {
    loginname: null,
    // loginname: window.localStorage.getItem('loginname') ? window.localStorage.getItem('loginname') : {},
    isLogin: false
    // isLogin: window.localStorage.getItem('isLogin') ? window.localStorage.getItem('isLogin') : false,

  },
  getters: {
    loginname: state => state.loginname,
    isLogin: state => state.isLogin
  },
  mutations: {
    setUser(state, payload) {
      state.loginname = payload.loginname
    },

    setLogin(state, payload) {
      state.isLogin = payload.isLogin
    }
  },
  actions: {
    login({ commit }, { accesstoken }) {
      return user.login({ accesstoken })
        .then(res => {
          commit('setUser', { loginname: res.data.loginname })
          // window.localStorage.setItem('loginname', res.data.loginname)
          commit('setLogin', { isLogin: true })
          // window.localStorage.setItem('isLogin', true)
          Message.success('登陆成功')
        })
    },

    async logout({ commit }) {
      commit('setUser', { loginname: null })
      // window.localStorage.setItem('loginname', null)
      commit('setLogin', { isLogin: false })
    //   window.localStorage.setItem('isLogin', false)
    }
  }
}