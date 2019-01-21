import Vue from 'vue'
import Router from 'vue-router'
import { loginCheck } from '@/services/login';
import store from '@/store';

Vue.use(Router)

//没有权限访问的页面
const errorAuthor = r => require.ensure([], () => r(require('@/pages/error_author/error_author.vue')), 'errorAuthor');
// 跳转页面
const jumping = r => require.ensure([], () => r(require('@/pages/jumping/jumping.vue')), 'jumping');

// 销售排名
const sellerRank = r => require.ensure([], () => r(require('@/pages/seller_rank/seller_rank.vue')), 'sellerRank');
// 门店排名
const storeRank = r => require.ensure([], () => r(require('@/pages/store_rank/store_rank.vue')), 'storeRank');
//数据看板
const dashBoard = r => require.ensure([], () => r(require('@/pages/dash_board/dash_board.vue')), 'dashBoard');
// 数据看板-选择导购
const chooseAdviser = r => require.ensure([], () => r(require('@/pages/dash_board/choose_adviser.vue')), 'chooseAdviser');
// 数据看板-图表
const chartDashboard = r => require.ensure([], () => r(require('@/pages/dash_board/chart_dashboard.vue')), 'chartDashboard');
// 数据看板-今日
const today = r => require.ensure([], () => r(require('@/pages/dash_board/today.vue')), 'today');
// 数据看板-本周
const weekday = r => require.ensure([], () => r(require('@/pages/dash_board/weekday.vue')), 'weekday');
// 数据看板-本月
const month = r => require.ensure([], () => r(require('@/pages/dash_board/month.vue')), 'month');
// 数据看板-累计
const total = r => require.ensure([], () => r(require('@/pages/dash_board/total.vue')), 'total');
// BA端
// BA 我的排名
const myRank = r => require.ensure([], () => r(require('@/pages/my_rank/my_rank.vue')), 'myRank');
// BA 我的业绩
const myAchievement = r => require.ensure([], () => r(require('@/pages/my_achievement/my_achievement.vue')), 'myAchievement');


const router = new Router({
  routes: [
    {
      path: '/'
    },
    // BA端
    {
      path: '/myRank',
      name: 'myRank',
      component: myRank,
      meta: {
        title: '我的排名'
      }
    },
    {
      path: '/myAchievement',
      name: 'myAchievement',
      component: myAchievement,
      meta: {
        title: '我的业绩'
      }
    },
    // 店长端
    {
      path: '/sellerRank',
      name: 'sellerRank',
      component: sellerRank,
      meta: {
        title: '导购排名'
      }
    },
    {
      path: '/storeRank',
      name: 'storeRank',
      component: storeRank,
      meta: {
        title: '门店排名'
      }
    },
    {
      path: '/dashBoard',
      name: '数据看板',
      component: dashBoard,
      redirect: '/dashBoard/today',
      meta: {
        title: '数据看板'
      },
      children: [
        {
          path: '/dashBoard/today',
          name: '今日',
          component: today,
        },
        {
          path: '/dashBoard/weekday',
          name: '本周',
          component: weekday,
        },
        {
          path: '/dashBoard/month',
          name: '本月',
          component: month,
        },
        {
          path: '/dashBoard/total',
          name: '累计',
          component: total,
        },
        {
          path: '/dashBoard/chartDashboard',
          name: '图表',
          component: chartDashboard,
          meta: {
            title: '图表展示',
            isShow: true
          }
        },
        {
          path: '/dashBoard/chooseAdviser',
          name: '选择导购',
          component: chooseAdviser,
          meta: {
            title: '选择导购',
            isShow: true
          }
        }
      ]
    },
    {
      path: '/errorAuthor',
      component: errorAuthor
    }
  ]
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
  let title = "";
  to.matched.forEach(item => {
    if (item.meta.title) {
      title = item.meta.title;
    }
    document.title = title;
  });
  // 设置是否显示底部tab
  store.commit('HIDDEN_FOOT', to.meta.isShow === undefined);
  
  // if(process.env.NODE_ENV === 'production'){
    await getLoginStatus().catch((err) => {
      console.log("err", err);
    });
  // }
  
  // 根据登录人员身份跳转到不同页面
  if (to.path === '/' && !store.state.wxInfo) {
    next('/errorAuthor');
  } else {
    if (to.path === '/' && store.state.wxInfo.roleId === 3) {
      next('/myRank')
    } else if (to.path === '/' && store.state.wxInfo.roleId === 2) {
      next('/sellerRank')
    }  else {
      next();
    }
  }
  next();
});

export default router;
function getLoginStatus() {
    return new Promise((resolve, reject) => {
        loginCheck().then(async res => {
            if (res.code === 200) {
              store.commit("RECORD_WXINFO", res.data.wxInfo);
              resolve(true)
            }
        }).catch(err => {
            resolve(false)
        })
    })
}



