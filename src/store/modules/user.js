import { getUserInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    accountNum: '',
    roles: [],
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    username: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_ACCOUNTNUM: (state, accountNum) => {
      state.accountNum = accountNum;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    // 存储当前账号
    SET_ACCOUNT: (state, username) => {
      state.username = username;
    },
  },

  actions: {
    // 登出
    LogOut({commit}) {
      return new Promise((resolve) => {
          commit('SET_TOKEN', '');
          removeToken();
          resolve();
      })
    },

    //登录过期
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      })
    },

    // 保存token信息
    SaveLoginInfo({commit}, token) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', token);
        setToken(token);
        resolve();
      })
    },

    // 获取用户信息，并且保存当前用户所属权限
    GetUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          if (response.data.code !== 200) {
            reject('error');
          }
          const data = response.data.data;
          commit('SET_ACCOUNT', data.username);
          commit('SET_ROLES', ['admin']);
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
  }
}

export default user
