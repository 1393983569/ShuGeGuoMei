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
 * hidden: true                   如果设置为true，项目将不会显示在侧栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不总是设置show，当项目有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  如果设置为true，则标记将附加在标记视图中
    breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中(默认为true)
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
    path: '/forget',
    name: 'forget',
    component: () => import('@/views/forget/index'),
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
        hidden:true,
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页图表', icon: 'Cameramanagement_default', affix: true }
      }
    ]
  },
  // {
  //   path: '/ownerCenter',
  //   name: 'ownerCenter',
  //   component: Layout,
  //   meta: {
  //     roles: ['ownerCenter'],
  //     icon: 'dashboard',
  //     title: '个人中心'
  //   },
  //   // component: Main,
  //   children: [
  //     {
  //       path: 'ownerCenter',
  //       name: 'ownerCenter',
  //       hidden:true,
  //       meta: {
  //         roles: ['ownerCenter'],
  //         icon: 'dashboard',
  //         title: '个人中心'
  //       },
  //       component: () => import('@/views/ownerCenter/owner.vue')
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
      roles: ['permission'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '请求允许',
          roles: ['PagePermission'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'PermissionDirective',
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
          roles: ['RolePermission']
        }
      }
    ]
  },
  {
    path: '/ownerCenter',
    name: 'ownerCenter',
    hidden:true,
    component: Layout,
    meta: {
      // roles: ['ownerCenter'],
      icon: 'messagecenter_default',
      title: '个人中心'
    },
    children: [
      {
        path: 'owner',
        name: 'owner',
        meta: {
          // roles: ['owner'],
          icon: 'messagecenter_default',
          title: ''
        },
        component: () => import('@/views/ownerCenter/owner.vue')
      }
    ]
  },
  // {
  //   path: '/forgetPassword',
  //   name: 'forgetPassword',
  //   // hidden:true,
  //   component: Layout,
  //   meta: {
  //     // roles: ['ownerCenter'],
  //     icon: 'messagecenter_default',
  //     title: '忘记密码'
  //   },
  //   children: [
  //     {
  //       path: 'changePassword',
  //       name: 'changePassword',
  //       meta: {
  //         // roles: ['owner'],
  //         icon: 'messagecenter_default',
  //         title: '修改密码'
  //       },
  //       component: () => import('@/views/forgetPassword/changePassword.vue')
  //     }
  //   ]
  // },
  {
    path: '/newsManage',
    name: 'newsManage',
    component: Layout,
    meta: {
      roles: ['newsManage'],
      icon: 'messagecenter_default',
      title: '消息管理'
    },
    children: [
      {
        path: 'news',
        name: 'news',
        meta: {
          roles: ['news'],
          icon: 'messagecenter_default',
          title: '消息中心'
        },
        component: () => import('@/views/newsManage/news/news.vue')
      },
      {
        path: 'newsDetail',
        name: 'newsDetail',
        hidden:true,
        meta: {
          roles: ['news'],
          icon: 'messagecenter_default',
          title: '详情'
        },
        component: () => import('@/views/newsManage/news/newsDetail.vue')
      },
      {
        path: 'newsRelease',
        name: 'newsRelease',
        hidden: true,
        meta: {
          // roles: ['newsRelease'],
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
      roles: ['ADManage'],
      icon: 'Advertisingcenter_default',
      title: '广告管理'
    },
    children: [
      {
        path: 'AD',
        name: 'AD',
        meta: {
          roles: ['AD'],
          icon: 'Advertisingcenter_default',
          title: '广告中心'
        },
        component: () => import('@/views/ADManage/AD/AD.vue')
      },
      {
        path: 'ADRelease',
        name: 'ADRelease',
        hidden: true,
        meta: {
          icon: 'dashboard',
          title: '广告发布'
        },
        component: () => import('@/views/ADManage/ADRelease.vue')
      },
      {
        path: 'ADDetail',
        name: 'ADDetail',
        hidden: true,
        meta: {
          icon: 'dashboard',
          title: '详情'
        },
        component: () => import('@/views/ADManage/AD/ADDetail.vue')
      }
    ]
  },
  {
    path: '/dataManage',
    name: 'dataManage',
    component: Layout,
    meta: {
      roles: ['dataManage'],
      icon: 'Datacenter_default',
      title: '数据中心'
    },
    children: [
      {
        path: 'dataCenter',
        name: 'dataCenter',
        meta: {
          roles: ['dataCenter'],
          icon: 'Datacenter_default',
          title: '数据中心'
        },
        component: () => import('@/views/dataManage/dataCenter.vue')
      }
    ]
  },
  {
    path: '/shopManage',
    name: 'shopManage',
    component: Layout,
    meta: {
      roles: ['shopManage'],
      icon: 'shopmanagement_default',
      title: '店铺管理'
    },
    children: [
      {
        path: 'shop',
        name: 'shop',
        meta: {
          roles: ['shop'],
          icon: 'shopmanagement_default',
          title: '店铺管理'
        },
        component: () => import('@/views/shopManage/shop.vue')
      },
      {
        hidden: true,
        path: 'shopEidt',
        name: 'shopEidt',
        meta: {
          icon: 'dashboard',
          title: '操作'
        },
        component: () => import('@/views/shopManage/shopEidt.vue')
      },
      {
        hidden: true,
        path: 'shopDetail',
        name: 'shopDetail',
        meta: {
          icon: 'dashboard',
          title: '详情'
        },
        component: () => import('@/views/shopManage/shopDetail.vue')
      }
    ]
  },
  {
    path: '/collectShop',
    name: 'collectShop',
    component: Layout,
    meta: {
      roles: ['collectShop'],
      icon: 'Commoditybank_default',
      title: '采集平台'
    },
    children: [
      {
        path: 'collectShopList',
        name: 'collectShopList',
        meta: {
          roles: ['collectShopList'],
          icon: 'dashboard',
          title: '商品库'
        },
        component: () => import('@/views/collectShop/collectShopList.vue')
      },
      {
        path: 'orderFormList',
        name: 'orderFormList',
        meta: {
          roles: ['orderFormList'],
          icon: 'dashboard',
          title: '订单'
        },
        component: () => import('@/views/collectShop/orderFormList.vue')
      },
      {
        path: 'separateBill',
        name: 'separateBill',
        hidden: true,
        meta: {
          roles: ['orderFormList'],
          icon: 'dashboard',
          title: '拆单',
          // breadcrumb: false
        },
        component: () => import('@/views/collectShop/separateBill.vue')
      },
      {
        path: 'orderDetails',
        name: 'orderDetails',
        hidden: true,
        meta: {
          roles: ['orderFormList'],
          icon: 'dashboard',
          title: '订单详情',
          // breadcrumb: false
        },
        component: () => import('@/views/collectShop/orderDetails.vue')
      },
      {
        path: 'particulars',
        name: 'particulars',
        hidden: true,
        meta: {
          roles: ['collectShopList'],
          icon: 'dashboard',
          title: '商品详情',
          // breadcrumb: false
        },
        component: () => import('@/views/collectShop/particulars.vue')
      },
      {
        path: 'childOrdersDetails',
        name: 'childOrdersDetails',
        hidden: true,
        meta: {
          roles: ['orderFormList'],
          icon: 'dashboard',
          title: '子订单详情',
          // breadcrumb: false
        },
        component: () => import('@/views/collectShop/childOrdersDetails.vue')
      },
      {
        path: 'addAndEdit',
        name: 'addAndEdit',
        hidden: true,
        meta: {
          roles: ['collectShopList'],
          icon: 'dashboard',
          title: '修改添加',
          // breadcrumb: false
        },
        component: () => import('@/views/collectShop/addAndEdit.vue')
      }
    ]
  },
  {
    path: '/providerManage',
    name: 'providerManage',
    component: Layout,
    meta: {
      roles: ['providerManage'],
      icon: 'Suppliermanagement_default',
      title: '供应商管理'
    },
    children: [
      {
        path: 'providerList',
        name: 'providerList',
        meta: {
          // roles: ['providerList'],
          icon: 'Suppliermanagement_default',
          title: '供应商管理'
        },
        component: () => import('@/views/providerManage/providerList.vue')
      },
      {
        path: 'providerAddEdit',
        name: 'providerAddEdit',
        hidden: true,
        meta: {
          roles: ['providerManage'],
          icon: 'dashboard',
          title: '修改添加'
        },
        component: () => import('@/views/providerManage/providerAddEdit.vue')
      },
      {
        path: 'providerDetail',
        name: 'providerDetail',
        hidden: true,
        meta: {
          roles: ['providerManage'],
          icon: 'dashboard',
          title: '详情'
        },
        component: () => import('@/views/providerManage/providerDetail.vue')
      }
    ]
  },
  {
    path: '/marketing',
    name: 'marketing',
    component: Layout,
    meta: {
      roles: ['marketing'],
      icon: 'Marketingcenter_default',
      title: '营销包管理'
    },
    children: [
      {
        path: 'marketPrice',
        name: 'marketPrice',
        meta: {
          roles: ['marketPrice'],
          icon: 'dashboard',
          title: '价格行情'
        },
        component: () => import('@/views/marketing/marketPrice/marketPrice.vue')
      },
      {
        path: 'discount',
        name: 'discount',
        meta: {
          // roles: ['discount'],
          icon: 'dashboard',
          title: '折扣包'
        },
        component: () => import('@/views/marketing/discount/discount.vue')
      },
      {
        path: 'discountDetail',
        name: 'discountDetail',
        hidden:true,
        meta: {
          // roles: ['discountDetail'],
          icon: 'dashboard',
          title: '折扣包详情'
        },
        component: () => import('@/views/marketing/discount/discountDetail.vue')
      },
      {
        path: 'discountEditAdd',
        name: 'discountEditAdd',
        hidden:true,
        meta: {
          // roles: ['discountEditAdd'],
          icon: 'dashboard',
          title: '折扣包编辑'
        },
        component: () => import('@/views/marketing/discount/discountEditAdd.vue')
      },
      {
        path: 'buygift',
        name: 'buygift',
        meta: {
          // roles: ['buygift'],
          icon: 'dashboard',
          title: '买赠包'
        },
        component: () => import('@/views/marketing/buygift/buygift.vue')
      },
      {
        path: 'integrationRule',
        name: 'integrationRule',
        meta: {
          // roles: ['integrationRule'],
          icon: 'dashboard',
          title: '积分规则'
        },
        component: () => import('@/views/marketing/integrationRule/integrationRule.vue')
      },
      {
        path: 'pricing',
        name: 'pricing',
        meta: {
          // roles: ['pricing'],
          icon: 'dashboard',
          title: '商品定价表'
        },
        component: () => import('@/views/marketing/pricing/pricing.vue')
      }
    ]
  },
  {
    path: '/memberManagement',
    name: 'memberManagement',
    component: Layout,
    meta: {
      roles: ['memberManagement'],
      icon: 'Membercenter_default',
      title: '会员管理'
    },
    children: [
      {
        path: 'memberList',
        name: 'memberList',
        meta: {
          roles: ['memberList'],
          icon: 'Membercenter_default',
          title: '会员管理'
        },
        component: () => import('@/views/memberManagement/memberList.vue')
      },
      {
        path: 'membershipDetails',
        name: 'membershipDetails',
        hidden: true,
        meta: {
          roles: ['memberManagement'],
          icon: 'dashboard',
          title: '会员详情'
        },
        component: () => import('@/views/memberManagement/membershipDetails.vue')
      },
      {
        path: 'rechargeRecord',
        name: 'rechargeRecord',
        hidden:true,
        meta: {
          roles: ['memberManagement'],
          icon: 'dashboard',
          title: '充值记录'
        },
        component: () => import('@/views/memberManagement/rechargeRecord.vue')
      },
      {
        path: 'expenseCalendar',
        name: 'expenseCalendar',
        hidden:true,
        meta: {
          roles: ['memberManagement'],
          icon: 'dashboard',
          title: '消费记录'
        },
        component: () => import('@/views/memberManagement/expenseCalendar.vue')
      },
      {
        path: 'expenseCalendarDetail',
        name: 'expenseCalendarDetail',
        hidden:true,
        meta: {
          roles: ['memberManagement'],
          icon: 'dashboard',
          title: '消费记录详情'
        },
        component: () => import('@/views/memberManagement/expenseCalendarDetail.vue')
      },
      {
        path: 'integralDetails',
        name: 'integralDetails',
        hidden: true,
        meta: {
          roles: ['memberManagement'],
          icon: 'dashboard',
          title: '积分详情'
        },
        component: () => import('@/views/memberManagement/integralDetails.vue')
      },
      {
        path: 'explain',
        name: 'explain',
        hidden: true,
        meta: {
          roles: ['memberManagement'],
          icon: 'dashboard',
          title: '会员系统说明'
        },
        component: () => import('@/views/memberManagement/explain.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Layout,
    meta: {
      // roles: ['admin'],
      icon: 'backgroundsystem_default',
      title: '后台系统'
    },
    children: [
      {
        path: 'adminList',
        name: 'adminList',
        meta: {
          // roles: ['adminList'],
          icon: 'dashboard',
          title: '后台用户'
        },
        component: () => import('@/views/admin/adminList.vue')
      },
      {
        path: 'roleList',
        name: 'roleList',
        hidden:true,
        meta: {
          // roles: ['roleList'],
          icon: 'dashboard',
          title: '角色'
        },
        component: () => import('@/views/admin/roleList.vue')
      },
      {
        path: 'roleOperation',
        name: 'roleOperation',
        hidden:true,
        meta: {
          // roles: ['roleOperation'],
          icon: 'dashboard',
          title: '角色操作'
        },
        component: () => import('@/views/admin/roleOperation.vue')
      },
      {
        path: 'caijiaUser',
        name: 'caijiaUser',
        meta: {
          // roles: ['caijiaUser'],
          icon: 'dashboard',
          title: '采价端用户'
        },
        component: () => import('@/views/admin/caijiaUser.vue')
      },
      {
        path: 'caijiaUserAdd',
        name: 'caijiaUserAdd',
        hidden:true,
        meta: {
          // roles: ['caijiaUser'],
          icon: 'dashboard',
          title: '采价端用户操作'
        },
        component: () => import('@/views/admin/caijiaUserAdd.vue')
      }
    ]
  },
  {
    path: '/category',
    name: 'category',
    component: Layout,
    meta: {
      roles: ['category'],
      icon: 'Basicdatasettings_default',
      title: '基础数据设置'
    },
    // component: Main,
    children: [
      {
        path: 'categoryList',
        name: 'categoryList',
        meta: {
          roles: ['categoryList'],
          icon: 'dashboard',
          title: '品类基础数据'
        },
        component: () => import('@/views/category/categoryList')
      },
      {
        path: 'cityList',
        name: 'cityList',
        meta: {
          // roles: ['cityList'],
          icon: 'dashboard',
          title: '开通城市'
        },
        component: () => import('@/views/category/cityList')
      },
      {
        path: 'caiJia',
        name: 'caiJia',
        meta: {
          // roles: ['cityList'],
          icon: 'dashboard',
          title: '采价市场数据'
        },
        component: () => import('@/views/category/caiJia')
      }
    ]
  },
  {
    path: '/accountCheck',
    name: 'accountCheck',
    component: Layout,
    meta: {
      roles: ['accountCheck'],
      icon: 'icon_checkaccounts_unselected',
      title: '对账'
    },
    children: [
      {
        path: 'shopCheck',
        name: 'shopCheck',
        meta: {
          roles: ['shopCheck'],
          icon: 'dashboard',
          title: '店铺对账单'
        },
        component: () => import('@/views/accountCheck/shopCheck/shopCheck.vue')
      },
      {
        path: 'shopCheckDetail',
        name: 'shopCheckDetail',
        hidden:true,
        meta: {
          // roles: ['accountCheck'],
          icon: 'dashboard',
          title: '店铺对账单详情'
        },
        component: () => import('@/views/accountCheck/shopCheck/shopCheckDetail.vue')
      },
      {
        path: 'childShopCheckDetail',
        name: 'childShopCheckDetail',
        hidden:true,
        meta: {
          // roles: ['accountCheck'],
          icon: 'dashboard',
          title: '店铺对账单详情'
        },
        component: () => import('@/views/accountCheck/shopCheck/childShopCheckDetail.vue')
      },
      {
        path: 'backstageCheck',
        name: 'backstageCheck',
        meta: {
          // roles: ['accountCheck'],
          icon: 'dashboard',
          title: '后台对账单'
        },
        component: () => import('@/views/accountCheck/backstageCheck/backstageCheck.vue')
      },
      {
        path: 'backstageCheckDetail',
        name: 'backstageCheckDetail',
        hidden:true,
        meta: {
          // roles: ['accountCheck'],
          icon: 'dashboard',
          title: '后台对账单详情'
        },
        component: () => import('@/views/accountCheck/backstageCheck/backstageCheckDetail.vue')
      }
    ]
  },
  // /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
// 设置滚动行为
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
