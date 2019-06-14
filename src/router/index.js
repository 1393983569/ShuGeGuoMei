import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * 恒定路由
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
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
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页图表', icon: 'dashboard', affix: true }
      }
    ]
  },
  // {
  //   path: '/shopManage',
  //   name: 'shopManage',
  //   component: Layout,
  //   meta: {
  //     roles: ['店铺管理'],
  //     icon: 'dashboard',
  //     title: '店铺管理'
  //   },
  //   // component: Main,
  //   children: [
  //     {
  //       path: 'shop',
  //       name: 'shop',
  //       meta: {
  //         roles: ['editor'],
  //         icon: 'dashboard',
  //         title: '店铺'
  //       },
  //       component: () => import('@/views/shopManage/shop.vue')
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes 请求服务器获得
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '许可',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '请求允许',
          roles: ['editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: '指令的许可',
        meta: {
          title: 'Directive Permission'
          // 如果不设置角色，表示:此页面不需要权限
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色权限',
          roles: ['editor']
        }
      }
    ]
  },
  {
    path: '/shopManage',
    name: 'shopManage',
    component: Layout,
    meta: {
      roles: ['admin'],
      icon: 'dashboard',
      title: '店铺管理'
    },
    // component: Main,
    children: [
      {
        path: 'shop',
        name: 'shop',
        meta: {
          roles: ['admin'],
          icon: 'dashboard',
          title: '店铺'
        },
        component: () => import('@/views/shopManage/shop.vue')
      }
    ]
  },
  {
    path: '/goodsManage',
    name: 'goodsManage',
    component: Layout,
    meta: {
      roles: ['admin'],
      icon: 'dashboard',
      title: '商品管理'
    },
    // component: Main,
    children: [
      {
        path: 'goods',
        name: 'goods',
        meta: {
          roles: ['admin'],
          icon: 'dashboard',
          title: '商品'
        },
        component: () => import('@/views/goodsManage/goods.vue')
      }
    ]
  },
  {
    path: '/newsManage',
    name: 'newsManage',
    component: Layout,
    meta: {
      roles: ['admin'],
      icon: 'dashboard',
      title: '消息管理'
    },
    // component: Main,
    children: [
      {
        path: 'news',
        name: 'news',
        meta: {
          roles: ['admin'],
          icon: 'dashboard',
          title: '消息中心'
        },
        component: () => import('@/views/newsManage/news/news.vue')
      },
      {
        path: 'newsRelease',
        name: 'newsRelease',
        meta: {
          roles: ['admin'],
          icon: 'dashboard',
          title: '消息发布'
        },
        component: () => import('@/views/newsManage/newsRelease.vue')
      }
    ]
  },
  {
    path: '/ADManage',
    name: 'ADManage',
    component: Layout,
    meta: {
      roles: ['admin'],
      icon: 'dashboard',
      title: '广告管理'
    },
    // component: Main,
    children: [
      {
        path: 'AD',
        name: 'AD',
        meta: {
          roles: ['admin'],
          icon: 'dashboard',
          title: '广告中心'
        },
        component: () => import('@/views/ADManage/AD/AD.vue')
      },
      {
        path: 'ADRelease',
        name: 'ADRelease',
        meta: {
          roles: ['admin'],
          icon: 'dashboard',
          title: '广告发布'
        },
        component: () => import('@/views/ADManage/ADRelease.vue')
      }
    ]
  },
  {
    path: '/dataManage',
    name: 'dataManage',
    component: Layout,
    meta: {
      roles: ['admin'],
      icon: 'dashboard',
      title: '数据中心'
    },
    children: [
      {
        path: 'dataCenter',
        name: 'dataCenter',
        meta: {
          roles: ['admin'],
          icon: 'dashboard',
          title: '数据'
        },
        component: () => import('@/views/dataManage/dataCenter.vue')
      }
    ]
  },
  {
    path: '/collectShop',
    name: 'collectShop',
    component: Layout,
    meta: {
      roles: ['admin'],
      icon: 'dashboard',
      title: '商品采集'
    },
    // component: Main,
    children: [
      {
        path: 'collectShopList',
        name: 'collectShopList',
        meta: {
          roles: ['admin'],
          icon: 'dashboard',
          title: '商品采集'
        },
        component: () => import('@/views/collectShop/collectShopList.vue')
      }
    ]
  },
  // /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
