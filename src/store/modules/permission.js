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
  const res = [];

  // const permissionButton=[];
  menus.forEach(menu => {
    const tmp = { ...menu };
    const m = findMenuObject(menuList, tmp.className);
    if (Object.keys(m).length !== 0) { // 后台传递过来的菜单选项 为 有效信息（在asyncRoutes中有匹配项）
      if (menu.child && menu.child.length > 0&&menu.type==1) {
        m.children = filterAsyncMenus(m.children, menu.child)
      }
        res.push(m);
    }
  });
  return res
}

function findMenuObject(menuList,path){
      let menuObject={};
      menuList.forEach(menu=>{
        if(menu.path.toString()===path.toString() ){
            menuObject=menu;
         }
         if(path.toString().indexOf("details")>-1&&menu.path.toString().indexOf("details")>-1){
           menuObject=menu;
          }

       })
    return menuObject;
}

/* 动态按钮 */
function filterAsyncButtons(accessRoutes) {
  return _.filter(_.concat([], ..._.map(accessRoutes, (item) => {
    return _.concat([], item, ...filterAsyncButtons(item.child))
  })), {type: 3})
}
function array2Json(array, key) {
  if (!array.length) {
    return {}
  }
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
        const accessedRoutes1 = filterAsyncMenus(asyncRoutes, accessRoutes.menuTreeVO.child);
        const buttonsArray = filterAsyncButtons(accessRoutes)
        const permissionButtons = array2Json(buttonsArray, 'className')
        // console.log(accessedRoutes1)
        commit('SET_ROUTERS', accessedRoutes1)
        commit('SET_BUTTONS', permissionButtons)
        resolve()
      })
    },
  }
}

export default permission
