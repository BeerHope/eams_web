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
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'home_icon', noCache: true, affix: true}
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
    path: '/work-order',
    component: Layout,
    redirect: '/work-order/list',
    name: 'WorkOrder',
    meta: {
      title: '',
      icon: ''
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/work-order/list'),
        name: 'WorkOrderList',
        meta: { title: '工单管理', icon: 'work-order', active:'/work-order/list'}
      },
      {
        path: 'details/:id',
        component: () => import('@/views/work-order/details'),
        name: 'WorkOrderDetails',
        meta: { title: '工单详情', icon: '' },
        hidden: true
      }
    ]
  },
  {
    path: '/equipment',
    component: Layout,
    name: 'Equipment',
    meta: { title: '', icon: ''},
    children: [
      {
        path: 'list',
        component: () => import('@/views/equipment/list'),
        name: 'EquipmentList',
        meta: { title: '设备管理', icon: 'equipment'},
      }
    ]
  },
  {
    path: '/record',
    component: Layout,
    redirect: '/record/list',
    name: 'Record',
    meta: {
      title: '',
      icon: ''
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/record/list'),
        name: 'RecordList',
        meta: { title: '生产记录', icon: 'work-order' }
      }
    ]
  },
  {
    path: '/binding',
    component: Layout,
    redirect: '/binding/list',
    name: 'Bind',
    meta: {
      title: '',
      icon: ''
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/binding/list'),
        name: 'BindingList',
        meta: { title: '绑定记录', icon: 'work-order' }
      }
    ]
  },
]

export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


export const otherPermission=[];

//运营人员
export const operateMenu = []

//客户
export const customerMenu = []

//超级管理员 --研发人员
export const superManMenu = []
