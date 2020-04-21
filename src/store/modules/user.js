import { getUserInfo, redirectToLogin} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    accountNum: '',
    roles: [],
    usertype:'',
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
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
    SET_USERTYPE: (state, usertype) => {
      state.usertype = usertype;
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone;
    },

    /*SET_CODE: (state, code) => {
      state.code = code
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },*/
  },

  actions: {
    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        /*logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })*/
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

    // 保存SSO的token信息
    SaveLoginInfo({commit}, token) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', token);
        setToken(token);
        resolve();
      })
    },

    // 获取用户信息
    GetUserInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {

          if (response.data.code !== 200) {
            reject('error');
          }
          const data = response.data.data;



          if(data.contactPhone!=""){
             commit('SET_PHONE',data.contactPhone);
          }else {
            commit('SET_PHONE',data.email);
          }


          if (data.roleType != null && data.roleType != undefined) {
            let tempRoles = (data.roleType == 1 ? ["admin"] : ["editor"]);


            commit('SET_USERTYPE', data.roleType);
            commit('SET_ROLES', tempRoles);
          } else {
            reject('getInfo: userType must be a non-null array !');
          }
          // commit('SET_NAME', data.staffName);
          // commit('SET_ACCOUNTNUM', data.accountNum);
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },


  }
}

export default user
