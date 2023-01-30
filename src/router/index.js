import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name:'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    // redirect: '/countryPage',
    children: [{
      path: 'countryPage',
      name: 'CountryPage',
      component: () => import('@/views/dashboard/countryPage'),
      meta: { title: '首页', icon: 'dashboard' },
    },
    {
      path: 'provincePage',
      name: 'ProvincePage',
      component: () => import('@/views/dashboard/provincePage'),
      hidden:true,
      meta: { title: '首页'}
    },
    {
      path: 'cityPage',
      name: 'CityPage',
      component: () => import('@/views/dashboard/cityPage'),
      hidden:true,
      meta: { title: '首页'}
    },
    {
      path: 'areaPage',
      name: 'AreaPage',
      component: () => import('@/views/dashboard/areaPage'),
      hidden:true,
      meta: { title: '首页'}
    }]
  },
  {
    path:'/statistics',
    component:Layout,
    name:'Statistics',
    meta:{
      title:'事件统计',
      icon:'el-icon-s-data'
    },
    children:[{
      path:'attack',
      name:'Attack',
      component:()=>import('@/views/Event_statistics/attack'),
      meta:{title:'恶意攻击统计'}
    },
    {
      path:'harm',
      name:'Harm',
      component:()=>import('@/views/Event_statistics/harm'),
      meta:{title:'受害情况统计'}
    }]
  },
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
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  const userLevel = sessionStorage.getItem('userLevel')
  if (to.name!=='login'&&!token) next({name:'login'})
  else if(to.name=='CountryPage'&&userLevel!='1'&&userLevel!='5') next({name:'login'})
  // else if(to.name=='countryPage'&&userLevel!='5') next({name:'login'})
  else if(to.name=='ProvincePage'&&userLevel!='1'&&userLevel!='2'&&userLevel!='5') next({name:'login'})
  else if(to.name=='CityPage'&&userLevel!='1'&&userLevel!='2'&&userLevel!='3'&&userLevel!='5') next({name:'login'})
  else next()
})
export default router
