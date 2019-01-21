<template>
  <div class="my-rank">
    <div class="first-tab">
      <template>
        <cube-tab-bar
          v-model="selectedTimeLabel"
          :data="timeTabs"
          show-slider
          @click="changeTimeTab">
        </cube-tab-bar>
      </template>
    </div>
    <div class="my-message">
      <div class="avatar"></div>
      <div class="messages">
        <p class="name">{{wxInfo.name}}</p>
        <p>工号： {{wxInfo.code}}</p>
      </div>
    </div>
    <div class="second-tab">
      <template>
        <cube-tab-bar
          v-model="selectedTypeLabel"
          :data="typeTabs"
          show-slider
          @click="changeTypeTab">
        </cube-tab-bar>
      </template>
    </div>
    <div class="my-rank-title">我的排名</div>
    <div class="my-rank-title-content">
      <div class="left">
        <div class="number"></div>
        <div class="avatar"></div>
        <div class="names">
          <p class="name">{{staffInfo.name}}</p>
          <p class="rank-num">第 {{staffInfo.rank}} 名</p>
        </div>
      </div>
      <div class="right"><span v-if="staffInfo.isMoney">&yen; </span>{{staffInfo.num}}</div>
    </div>
    <div class="my-rank-title">导购会员排行榜</div>
    <ul class="my-rank-content" v-if="adviserList.length">
      <li class="my-rank-title-content" v-for="(item, index) in adviserList" :key="item.name">
        <div class="left">
          <div class="number">{{index + 1}}</div>
          <div class="avatar"></div>
          <div class="names">
            <p class="name">{{item.name}}</p>
            <p class="rank-num">{{item.storeName}}</p>
          </div>
        </div>
        <div class="right">
          <span v-if="staffInfo.isMoney">&yen; </span>
          <span v-if="staffInfo.isMoney">{{Number(item.count).toFixed(2)}}</span>
          <span v-if="!staffInfo.isMoney">{{Number(item.count)}}</span>
        </div>
      </li>
    </ul>
    <div v-if="!adviserList.length" class="no-data">
      暂无数据！
    </div>
  </div>
</template>

<script>
import {getBaList} from '@/services/my_rank';
import { mapGetters } from 'vuex';

export default {
  data(){
    return {
      selectedTimeLabel: '今日',
      timeTabs: [{
        label: '今日'
      }, {
        label: '本周'
      }, {
        label: '本月'
      }, {
        label: '累计'
      }],
      selectedTypeLabel: '销售额',
      typeTabs: [
        {
          label: '销售额'
        }, 
        {
          label: '会员招募'
        }, 
        {
          label: '客单价'
        }, 
        {
          label: '复购量'
        }
      ],
      staffInfo: {
        name: '',
        code: '',
        rank: 1,
        num: 0,
        isMoney: true
      },
      // 今日数据
      todayData:{},
      // 本周数据
      weekData: {},
      // 本月数据
      monthData: {},
      // 累计数据
      totalData: {},
      adviserList: []
    }
  },
  computed: {
    ...mapGetters(['wxInfo'])
  },
  mounted(){
    // 默认是今日的数据
    this.getBaListMsg('today');
  },
  methods:{
    getBaListMsg(type) {
      getBaList({countType: type}).then(res => {
        if (res.code === 200) {
          // 一进来就获得默认的数据，默认的是今日-销售额的数据
          this.staffInfo.name = res.data.info.name;
          this.staffInfo.code = res.data.info.code;
          this.staffInfo.rank = res.data.info.salesMoneyRank;
          this.staffInfo.num = res.data.info.salesMoneyTotal.toFixed(2);
          this.staffInfo.isMoney = true;
          // 默认是销售额的数据
          this.adviserList = res.data.totalSalesList;
          if (this.adviserList && 0 in this.adviserList) {
            this.adviserList.forEach(item => {
              this.$set(item, 'count', item.totalMoney);
            })
          }
          if (type === 'today') {
            this.todayData = res.data;
          } else if (type === 'week') {
            this.weekData = res.data;
          } else if (type === 'month') {
            this.monthData = res.data;
          } else if (type === 'total') {
            this.totalData = res.data;
          }
        }
      }).catch(err => {
        console.log('err', err);
      })
    },
    changeTimeTab(label) {
      // 切换时间时必须从销售额开始显示，因为默认是销售额的数据
      this.selectedTypeLabel = '销售额';
      if (label === '今日') {
        this.getBaListMsg('today');
      } else if (label === '本周') {
        this.getBaListMsg('week');
      } else if (label === '本月') {
        this.getBaListMsg('month');
      } else if (label === '累计') {
        this.getBaListMsg('total');
      }
    },
    changeTypeTab(label) {
      if (this.selectedTimeLabel === '今日') {
        this._switchType(label, this.todayData);
      } else if (this.selectedTimeLabel === '本周') {
        this._switchType(label, this.weekData);
      } else if (this.selectedTimeLabel === '本月') {
        this._switchType(label, this.monthData);
      } else if (this.selectedTimeLabel === '累计') {
        this._switchType(label, this.totalData);
      }
    },
    _switchType(label, data) {
      if (label === '销售额') {
        this.staffInfo.rank = data.info.salesMoneyRank;
        this.staffInfo.num = data.info.salesMoneyTotal.toFixed(2);
        this.staffInfo.isMoney = true;
        this.adviserList = data.totalSalesList;
        if (this.adviserList && 0 in this.adviserList) {
          this.adviserList.forEach(item => {
            this.$set(item, 'count', item.totalMoney);
          })
        }
      } else if (label === '会员招募') {
        this.staffInfo.rank = data.info.memberRecuitRank;
        this.staffInfo.num = data.info.memberRecuitNum;
        this.staffInfo.isMoney = false;
        this.adviserList = data.memberRecuitList;
        if (this.adviserList && 0 in this.adviserList) {
          this.adviserList.forEach(item => {
            this.$set(item, 'count', item.totalCount);
          })
        }
      } else if (label === '客单价') {
        this.staffInfo.rank = data.info.orderAvgRank;
        this.staffInfo.num = data.info.orderAvgTotal.toFixed(2);
        this.staffInfo.isMoney = true;
        this.adviserList = data.avgList;
        if (this.adviserList && 0 in this.adviserList) {
          this.adviserList.forEach(item => {
            this.$set(item, 'count', item.avgPerPrice);
          })
        }
      } else if (label === '复购量') {
        this.staffInfo.rank = data.info.repeatOrderRank;
        this.staffInfo.num = data.info.repeatOrderNum;
        this.staffInfo.isMoney = false;
        this.adviserList = data.repeatCountList;
        if (this.adviserList && 0 in this.adviserList) {
          this.adviserList.forEach(item => {
            this.$set(item, 'count', item.avgOrderNumber);
          })
        }
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.my-rank{
  font-size: rem($font-size-medium);
  color: $main-text-color;
  .my-message {
    display: flex;
    align-items: center;
    height: rem(70px);
    padding: 0 rem(20px);
    background-color: $background-color-white;
    .avatar {
      flex: 0 0 rem(44px);
      width: rem(44px);
      height: rem(44px);
      border-radius: 50%;
      background-color: #ccc;
    }
    .messages {
      flex: 1;
      margin-left: rem(20px);
      .name {
        font-size: rem($font-size-medium-x);
        font-weight: bold;
        margin-bottom: rem(10px);
      }
    }
  }
  .my-rank-title {
    padding-left: rem(20px);
    color: $main-text-color-s;
    line-height: rem(40px);
  }
  .my-rank-title-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: rem(57px);
    padding-right: rem(20px);
    background-color: $background-color-white;
    @include border-1px($border-color);
    .left {
      display: flex;
      align-items: center;
      .number {
        margin-left: rem(10px);
        width: rem(20px);
        text-align: right;
      }
      .avatar {
        width: rem(40px);
        height: rem(40px);
        border-radius: 50%;
        margin-left: rem(20px);
        background-color: #ccc;
      }
      .names {
        margin-left: rem(20px);
        .name {
          margin-bottom: rem(5px);
        }
        .rank-num {
          font-size: rem($font-size-small);
          color: $main-text-color-ss;
        }
      }
    }
    .right {
      font-size: rem($font-size-large);
      color: $blue-tab-color;
    }
  }
  .my-rank-content {
    margin-bottom: rem(57px);
  }
}
.no-data {
  margin-top: rem(30px);
  text-align: center;
}
</style>

<style lang="scss">
  .my-rank .first-tab .cube-tab-bar{
    background-color: $blue-tab-bgcolor;
    height: rem(33px);
  }
  .my-rank .first-tab .cube-tab_active {
    color: #FFFFFF;
  }
  .my-rank .first-tab .cube-tab {
    color: #FFFFFF;
  }
  .my-rank .first-tab .cube-tab-bar-slider {
    height: rem(4px);
    background: linear-gradient(-135deg, #1DBDB7 0%, #3DE792 100%);
  }
  .my-rank .second-tab .cube-tab-bar {
    background-color: $background-color-white;
    height: rem(50px);
  }
  .my-rank .second-tab .cube-tab_active {
    color: $blue-tab-color;
  }
  .my-rank .second-tab .cube-tab-bar-slider {
    height: rem(4px);
    background: $blue-tab-color;
    width: rem(70px) !important;
    margin-left: rem(12px) !important;
  }
</style>