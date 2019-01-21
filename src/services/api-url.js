export default {
    //登陆
    loginApi: {
        loginCheck: '/beautyWxApi/staff/loginCheck'
    },
    // 导购排名
    sellerRank: {
        sellerList: '/beautyWxApi/staff/rank/staff'
    },
    // 门店排名
    storeRank: {
        storeList: '/beautyWxApi/staff/rank/store',
        storeCount: '/beautyWxApi/staff/sum/store'
    },
    // 数据看板
    dashBoard: {
        getDashBoard: '/beautyWxApi/staff/manage/dataBoard',
        getBaList: '/beautyWxApi/staff/manage/staffList',
        getChart: '/beautyWxApi/staff/manage/lineChart'
    },
    // 我的排名
    myRank: {
        baList: '/beautyWxApi/staff/ba/baTop'
    },
    // 我的业绩
    myAchievement: {
        achievementData: '/beautyWxApi/staff/ba/dataBoard',
        achievementChart: '/beautyWxApi/staff/ba/lineChart'
    }
}
