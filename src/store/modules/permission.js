import {  constantRouterMap, operateMenu, otherPermission, customerMenu, superManMenu} from '@/router'
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
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(routes, roles) {
//   const res = []
//
//   routes.forEach(route => {
//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRouter(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })
//
//   return res
// }

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
           //查询并行菜单权限
          // otherPermission.forEach(m=>{
          //   const menuTemp = { ...m }
          //      if(menuTemp.path===tmp.url){
          //         const MenusSon= menuTemp.menus;
          //         MenusSon.forEach(Son=>{
          //           const ms=findMenuObject(menuList,Son);
          //           childrenArr.push(ms);
          //         })
          //      }
          // })
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

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    // GenerateRoutes({ commit }, data) {
    //
    //   console.log(data);
    //   return new Promise(resolve => {
    //     const { roles } = data
    //     let accessedRouters
    //     if (roles.includes('admin')) {
    //       accessedRouters = asyncRouterMap;
    //     } else {
    //       accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
    //     }
    //     commit('SET_ROUTERS', accessedRouters)
    //     resolve()
    //   })
    // },
    GenerateRoutes1({ commit }, data){
      //组装路由菜单
      return new Promise(resolve => {
        let accessedRouters;
        // accessedRouters = filterAsyncMenus(menuList, menus);
        //根据用户的角色加载不同类型
        if(data.roleType==1){  //1：运营 2：研发 3：客户
          accessedRouters=operateMenu;
        }else if(data.roleType==2){
          accessedRouters=superManMenu;
        }else{
          accessedRouters=customerMenu;
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }

  }
}

export default permission
