import Main from '@/view/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [{
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () =>
      import ('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        hideInMenu: true,
        title: '首页',
        notCache: true
      },
      component: () =>
        import ('@/view/single-page/home')
    }]
  },
  // {
  //   path: '',
  //   name: 'doc',
  //   meta: {
  //     title: '文档',
  //     href: 'https://lison16.github.io/iview-admin-doc/#/',
  //     icon: 'ios-book'
  //   }
  // },
  // {
  //   path: '/join',
  //   name: 'join',
  //   component: Main,
  //   children: [
  //     {
  //       path: 'join_page',
  //       name: 'join_page',
  //       meta: {
  //         icon: '_qq',
  //         title: 'QQ群'
  //       },
  //       component: () => import('@/view/join-page.vue')
  //     }
  //   ]
  // },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: '_users',
      title: '用户管理'
    },
    component: Main,
    children: [
      // {
      //   path: 'count_to_page',
      //   name: 'count_to_page',
      //   meta: {
      //     icon: 'md-trending-up',
      //     title: '数字渐变'
      //   },
      //   component: () =>
      //     import ('@/view/components/count-to/count-to.vue')
      // },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: '_users',
          title: '用户管理'
        },
        component: () =>
          import ('@/view/components/tables/users.vue')
      }
    ]
  },
  {
    path: '/update',
    name: 'update',
    meta: {
      icon: '_demand',
      title: '需求管理'
    },
    component: Main,
    children: [
      // {
      //   path: 'update_table_page',
      //   name: 'update_table_page',
      //   meta: {
      //     icon: 'ios-document',
      //     title: '上传Csv'
      //   },
      //   component: () =>
      //     import ('@/view/update/update-table.vue')
      // },
      {
        path: 'tables_demand',
        name: 'tables_demand',
        meta: {
          icon: '_demand',
          title: '需求管理'
        },
        component: () =>
          import ('@/view/components/tables/demands.vue')
      },
      // {
      //   path: 'update_paste_page',
      //   name: 'update_paste_page',
      //   meta: {
      //     icon: 'md-clipboard',
      //     title: '粘贴表格数据'
      //   },
      //   component: () =>
      //     import ('@/view/update/update-paste.vue')
      // }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      icon: '_photos',
      title: '图片管理'
    },
    component: Main,
    children: [

      {
        path: 'tables_photo',
        name: 'tables_photo',
        meta: {
          icon: '_photos',
          title: '图片管理'
        },
        component: () =>
          import ('@/view/components/tables/photos.vue')
      },
      // {
      //   path: 'upload-excel',
      //   name: 'upload-excel',
      //   meta: {
      //     icon: 'md-add',
      //     title: '导入EXCEL'
      //   },
      //   component: () =>
      //     import ('@/view/excel/upload-excel.vue')
      // },
      // {
      //   path: 'export-excel',
      //   name: 'export-excel',
      //   meta: {
      //     icon: 'md-download',
      //     title: '导出EXCEL'
      //   },
      //   component: () =>
      //     import ('@/view/excel/export-excel.vue')
      // }
    ]
  },

  {
    path: '/',
    name: 'category',
    redirect: '/category',
    component: Main,
    children: [{
      path: '/category',
      name: '/category',
      meta: {
        icon: '_category',
        title: '类别管理',
      },
      component: () =>
      import ('@/view/components/tables/category.vue')
    }]
  },

  // {
  //   path: '/multilevel',
  //   name: 'multilevel',
  //   meta: {
  //     icon: '_category',
  //     title: '类别管理'
  //   },
    // component: Main,
    // children: [
    //   {
    //     path: 'tables_category',
    //     name: 'tables_category',
    //     meta: {
    //       icon: 'md-grid',
    //       title: '类别表'
    //     },
    //     component: () =>
    //       import ('@/view/components/tables/category.vue')
    //   },
    // ]
  // },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [{
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: '动态路由'
        },
        component: () =>
          import ('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: '带参路由'
        },
        component: () =>
          import ('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import ('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import ('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import ('@/view/error-page/404.vue')
  }
]
