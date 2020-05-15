import { constantRouter, asyncRoutes } from '@/router'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * { path: '*', redirect: '/404', hidden: true }
 * @type {{mutations: {SET_ROUTERS: permission.mutations.SET_ROUTERS}, state: {routers: *, addRouters: Array}, actions: {GenerateRoutes1({commit: *}, *): *, GenerateRoutes({commit: *}, *=): *}}}
 */
function filterAsyncMenus(menuList, menus){
  let res = []
  menus.forEach(menu => {
    const tmp = { ...menu }
    const m=findMenuObject(menuList,tmp.url);
      if(menu.children.length>0){
        let childrenArr=[];
        const childrens=menu.children;
        childrens.forEach(children=>{
          const tmp = { ...children }
          const mm=findMenuObject(menuList,tmp.url);
          childrenArr.push(mm);
        })
        m.children=childrenArr;
      }
    res.push(m);
  })

  res.push({ path: '*', redirect: '/404', hidden: true });
  return res
}
function findMenuObject(menuList,path){
      let menuObject={};
      menuList.forEach(menu=>{
        if(menu.path===path){
            menuObject=menu.content;
        }
      })
    return menuObject;
}
/* 菜单权限数据mock */
/*
type: 1,2 => 页面，按钮 

 先获取第一层级
*/
const routesMap = [
  {
    id: '11',
    checked: true,
    name: '用户管理',
    className: 'user',
    type: 1,
    child: [
      {
        id: '111',
        checked: true,
        name: '用户列表',
        className: 'user.list',
        type: 1,
        child: [],
      },
      {
        id: '112',
        checked: true,
        name: '新增用户',
        className: 'user.list.add',
        child: [],
        type: 2,
      }
    ]
  },
  {
    id: '13',
    checked: true,
    name: '角色管理',
    className: 'role',
    type: 1,
    child: [
      {
        id: '131',
        checked: true,
        name: '角色列表',
        className: 'role.list',
        child: [],
        type: 1,
      },
      {
        id: '132',
        checked: true,
        name: '新增工厂',
        className: 'role.list.add',
        child: [],
        type: 2
      }
    ]
  },
  {
    id: '12',
    checked: true,
    name: '工厂管理',
    className: 'factory',
    type: 1,
    child: [
      {
        id: '121',
        checked: true,
        name: '工厂列表',
        className: 'factory.list',
        child: [],
        type: 1,
      },
      {
        id: '122',
        checked: true,
        name: '新增工厂',
        className: 'factory.list.add',
        child: [],
        type: 2
      }
    ]
  }
]
/* 动态菜单(待完善)*/
function filterAsyncRouter(asyncRoutes, accessRoutes) {
  return _.filter(asyncRoutes, (item) => {
    return _.find(accessRoutes, {className: _.lowerCase(item.name)})
  })
}
/* 动态按钮 */
function filterAsyncButtons(accessRoutes) {
  return _.filter(_.concat([], ..._.map(accessRoutes, (item) => {
    return _.concat([], item, ...filterAsyncButtons(item.child))
  })), {type: 3})
}
function array2Json(array, key) {
  return _.keyBy(array, key)
}

const permission = {
  state: {
    routers: constantRouter,
    addRouters: [],
    permissionButtons: {},
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = _.concat(constantRouter, routers)
    },
    SET_BUTTONS: (state, permissionButtons) => {
      state.permissionButtons = permissionButtons
    }
  },
  actions: {
    /* 存储动态权限（菜单、按钮） */
    GenerateRoutes({ commit }, accessRoutes){
      return new Promise(resolve => {
        const permissionRoutes = filterAsyncRouter(asyncRoutes, routesMap)
        /* todo 将按钮为json存储在vuex中*/
        // const buttonsArray = filterAsyncButtons(routesMap)
        const buttonsArray = filterAsyncButtons(accessRoutes)
        const permissionButtons = array2Json(buttonsArray, 'className')
        commit('SET_ROUTERS', asyncRoutes)
        commit('SET_BUTTONS', permissionButtons)
        resolve()
      })
    },
  }
}

export default permission
