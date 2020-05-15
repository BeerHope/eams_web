import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout';

/* Router Modules */
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register/:token*',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/findpass',
    component: () => import('@/views/findpass/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'Home',
        meta: { title: '首页', icon: 'home', noCache: true, affix: true}
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    meta: {
      title: '',
      icon: ''
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/user/list'),
        meta: {
          title: '用户管理',
          icon: 'user'
        },
        name: 'UserList'
      }
    ]
  },
  // 渠道商管理
  {
    path: '/factory',
    component: Layout,
    redirect: '/factory/list',
    name: '',
    meta: {
      title: '',
      icon: ''
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/factory/list'),
        name: 'FactoryList',
        meta: {
          title: '工厂管理', icon: 'factory'
        }
      }
    ]
  },
  // 工单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'WorkOrder',
    meta: {
      title: '',
      icon: ''
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/order/list'),
        name: 'WorkOrderList',
        meta: { title: '订单管理', icon: 'order'}
      },
      {
        path: 'details/:orderId',
        component: () => import('@/views/order/details'),
        name: 'WorkOrderDetails',
        meta: { title: '订单详情', icon: '', active:'/order/list'},
        hidden: true
      }
    ]
  },
  {
    path: '/device',
    component: Layout,
    name: 'Device',
    meta: { title: '', icon: ''},
    children: [
      {
        path: 'list',
        component: () => import('@/views/device/list'),
        name: 'DeviceList',
        meta: { title: '设备管理', icon: 'device'},
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    redirect: '/log/list',
    name: 'Log',
    meta: {
      title: '',
      icon: ''
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/log/list'),
        name: 'LogList',
        meta: { title: '生产记录', icon: 'log' }
      },
      {
        path: 'details/:logId',
        component: () => import('@/views/log/details'),
        name: 'LogDetails',
        meta: { title: '设备生产详情', active:'/log/list' },
        hidden: true,
      }
    ]
  },
  {
    path: '/unbind',
    component: Layout,
    redirect: '/unbind/list',
    name: 'Unbind',
    meta: {
      title: '',
      icon: ''
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/unbind/list'),
        name: 'UnbindList',
        meta: { title: '解绑记录', icon: 'unbind' }
      }
    ]
  },
  /* 白名单管理(工具授权) */
  {
    path: '/whitelist',
    component: Layout,
    redirect: '/whitelist/list',
    name: 'Whitelist',
    meta: {
      title: '',
      icon: ''
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/whitelist/list'),
        name: 'WhitelistList',
        meta: { title: '白名单管理', icon: 'whitelist' }
      }
    ]
  },
   /* 标识管理 */
  {
    path: '/process',
    component: Layout,
    redirect: '/process/list',
    name: 'Process',
    meta: {
      title: '',
      icon: ''
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/process/list'),
        name: 'ProcessList',
        meta: { title: '标识管理', icon: 'process' }
      }
    ]
  }
]

export default new Router({
  mode: 'history', // require service support
  base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 其他账号权限
export const otherPermission=[];

//运营人员
export const operateMenu = []

//客户
export const customerMenu = []

//超级管理员 --研发人员
export const superManMenu = []
