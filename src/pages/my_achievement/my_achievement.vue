<template>
  <div class="my-achievement">
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
    <!-- 显示今日页面 -->
    <div v-show="selectedTimeLabel === '今日'">
      <div v-show="selectedTypeLabel === '我的绩效'" class="content-wrapper">
        <div class="item" v-for="item in todayAchievement" :key="item.label">
          <div class="item-content">
            <p>{{item.num}}</p>
            <p>{{item.label}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 显示不是今日的页面 -->
    <div v-show="!(selectedTimeLabel === '今日')">
      <div v-show="selectedTypeLabel === '我的绩效'" class="week-month-content-wrapper">
        <div class="commission-content-top">
          <div class="commisstion-item">
            <p>销售额（元）</p>
            <p><span>&yen; {{todayAchievement[0].num}}</span><span class="down-icon" v-show="selectedTimeLabel !== '累计'"></span></p>
          </div>
          <div class="commisstion-item">
            <p>会员招募数量</p>
            <p><span>{{todayAchievement[1].num}}</span><span class="up-icon" v-show="selectedTimeLabel !== '累计'"></span></p>
          </div>
          <div class="commisstion-item">
            <p>复购会员数量</p>
            <p><span>{{todayAchievement[3].num}}</span><span class="up-icon" v-show="selectedTimeLabel !== '累计'"></span></p>
          </div>
        </div>
        <div class="chart" v-if="chartShow">
          <div class="chart-sell">
            <echarts :type="echartSellNum.echartType" :echartsWidth="echartSellNum.width" :echartsHeight="echartSellNum.height" :option="echartSellNum.option" :elmId="echartSellNum.elmId"></echarts>
          </div>
          <div class="chart-sell">
            <echarts :type="echartRecruitNum.echartType" :echartsWidth="echartRecruitNum.width" :echartsHeight="echartRecruitNum.height" :option="echartRecruitNum.option" :elmId="echartRecruitNum.elmId"></echarts>
          </div>
          <div class="chart-sell">
            <echarts :type="echartRepeatNum.echartType" :echartsWidth="echartRepeatNum.width" :echartsHeight="echartRepeatNum.height" :option="echartRepeatNum.option" :elmId="echartRepeatNum.elmId"></echarts>
          </div>
          
        </div>
      </div>
    </div>
    <!-- 显示我的佣金页面 -->
    <div v-show="!(selectedTypeLabel === '我的绩效')">
      <my-commission></my-commission>
    </div>
  </div>
</template>

<script>
import Echarts from "../dash_board/lib/echarts";
import { echartSell, echartRecruit, echartRepeat} from "./chart_data";
import MyCommission from './my_commission';
import { getAchievementData, getAchievementChart } from '@/services/my_achievement';
import { mapGetters } from 'vuex';

export default {
  components: {
    Echarts,
    MyCommission
  },
  computed: {
    ...mapGetters(['wxInfo'])
  },
  data(){
    return {
      selectedTimeLabel: '今日',
      timeTabs: [
        {
        label: '今日'
        }, 
        {
        label: '本周'
        }, 
        {
        label: '本月'
        }, 
        {
        label: '累计'
        }
      ],
      selectedTypeLabel: '我的绩效',
      typeTabs: [
        {
          label: '我的绩效'
        }, 
        {
          label: '我的佣金'
        }
      ],
      todayAchievement: [
        {
          label: '销售额（元）',
          num: 980
        },
        {
          label: '会员招募数量',
          num: 90
        },
        {
          label: '客单价（元）',
          num: 70
        },
        {
          label: '复购会员数量',
          num: 12
        }
      ],
      // 图表数据
      chartShow: false,
      echartSellNum: echartSell,
      echartRecruitNum: echartRecruit,
      echartRepeatNum: echartRepeat
    }
  },
  mounted(){
    this.getAchievementDataMsg('today');
  },
  methods:{
    getAchievementDataMsg(type) {
      let params = {countType: type};
      getAchievementData(params).then(res => {
        if (res.code === 200) {
          this.todayAchievement[0].num = res.data.saleAmount.toFixed(2);
          this.todayAchievement[1].num = res.data.recruit;
          this.todayAchievement[2].num = res.data.atv;
          this.todayAchievement[3].num = res.data.repeat;
        }
      }).catch(err => {
        console.log('err', err);
      })
    },
    // 获取图标数据
    getAchievementChartMsg(time) {
      let promise1 = getAchievementChart({countType: time, countContent: 'saleAmount'});
      let promise2 = getAchievementChart({countType: time, countContent: 'recruit'});
      let promise3 = getAchievementChart({countType: time, countContent: 'repeat'});
      Promise.all([promise1, promise2, promise2]).then(all => {
        if (all[0].code === 200 && all[2].code === 200 && all[0].code === 200) {
          this.chartShow = true;
        }
        if (all[0].code === 200) {
          if (all[0].data.list && all[0].data.list.length) {
            this.echartSellNum.option.xAxis.data = [];
            this.echartSellNum.option.series[0].data = [];
            all[0].data.list.forEach(item => {
              this.echartSellNum.option.xAxis.data.push(item.term);
              this.echartSellNum.option.series[0].data.push(item.value);
            })
          }
        }
        if (all[1].code === 200) {
          if (all[1].data.list && all[1].data.list.length) {
            this.echartRecruitNum.option.xAxis.data = [];
            this.echartRecruitNum.option.series[0].data =[];
            all[1].data.list.forEach(item => {
              this.echartRecruitNum.option.xAxis.data.push(item.term);
              this.echartRecruitNum.option.series[0].data.push(item.value);
            })
          }
        }
        if (all[2].code === 200) {
          if (all[2].data.list && all[2].data.list.length) {
            this.echartRepeatNum.option.xAxis.data = [];
            this.echartRepeatNum.option.series[0].data = [];
            all[2].data.list.forEach(item => {
              this.echartRepeatNum.option.xAxis.data.push(item.term);
              this.echartRepeatNum.option.series[0].data.push(item.value);
            })
          }
        }
      })
    },
    changeTimeTab(label) {
      this.selectedTypeLabel = '我的绩效';
      if (label === '今日') {
        this.getAchievementDataMsg('today');
      } else if (label === '本周') {
        this.getAchievementDataMsg('week');
        this.getAchievementChartMsg('week');
      } else if (label === '本月') {
        this.getAchievementDataMsg('month');
        this.getAchievementChartMsg('month');
      } else if (label === '累计') {
        this.getAchievementDataMsg('total');
        this.getAchievementChartMsg('total');
      }
    },
    changeTypeTab() {

    }
  }
}
</script>
<style lang="scss" scoped>
.my-achievement{
  font-size: rem($font-size-medium);
  color: $main-text-color;
  overflow-x: hidden;
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
  .content-wrapper {
    position: absolute;
    top: rem(153px);
    bottom: rem(57px);
    width: 100%;
    background-color: $background-color-white;
    padding: rem(20px);
    box-sizing: border-box;
    font-size: 0;
    .item {
      display: inline-block;
      width: calc(50% - 10px);
      height: rem(130px);
      line-height: rem(130px);
      background-color: $main-background-color;
      margin-bottom: rem(20px);
      border-radius: rem(3px);
      text-align: center;
      &:nth-child(2n) {
        margin-left: 20px;
      }
      .item-content {
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
        p:first-child {
          font-size: rem(24px);
          color: $main-text-color;
          margin-bottom: rem(20px);
        }
        p:last-child {
          font-size: rem($font-size-medium);
          color: $main-text-color-s;
        }
      }
    }
  }
  .second-tab {
    @include border-1px-bottom($border-color);
  }
  .commission-content-top {
    padding: rem(20px);
    background-color: $background-color-white;
    font-size: 0;
    .commisstion-item {
      display: inline-block;
      width: calc(33.3333333% - 6.6666667px);
      background-color: $main-background-color;
      height: rem(90px);
      border-radius: rem(3px);
      p:first-child {
        font-size: rem($font-size-small);
        color: $main-text-color-s;
        margin: rem(15px) 0 rem(15px) rem(15px);
      }
      p:last-child {
        display: flex;
        justify-content: space-between;
        font-size: rem(16px);
        font-weight: bold;
        margin: 0 rem(15px);
      }
    }
    .commisstion-item + .commisstion-item {
      margin-left: 10px;
    }
  }

  .up-icon {
    position: relative;
    top: -4px;
    display: inline-block;
    font-size: 0;
    width: 0;
    height: 0;
    border: 6px solid;
    border-color: transparent transparent $blue-tab-color transparent;
    &:after {
      content: '';
      position: absolute;
      top: 6px;
      left: -3px;
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: $blue-tab-color;
    }
  }
  .down-icon {
    position: relative;
    top: 8px;
    display: inline-block;
    font-size: 0;
    width: 0;
    height: 0;
    border: 6px solid;
    border-color: #F76262 transparent transparent transparent;
    &:before {
      content: '';
      position: absolute;
      top: -12px;
      left: -3px;
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: #F76262;
    }
  }
  .week-month-content-wrapper {
    background-color: $background-color-white;
    margin-bottom: rem(57px);
    .chart {
      width: 100%;
    }
  }
  
}
</style>

<style lang="scss">
  .my-achievement .first-tab .cube-tab-bar{
    background-color: $blue-tab-bgcolor;
    height: rem(33px);
  }
  .my-achievement .first-tab .cube-tab_active {
    color: #FFFFFF;
  }
  .my-achievement .first-tab .cube-tab {
    color: #FFFFFF;
  }
  .my-achievement .first-tab .cube-tab-bar-slider {
    height: rem(4px);
    background: linear-gradient(-135deg, #1DBDB7 0%, #3DE792 100%);
  }
  .my-achievement .second-tab .cube-tab-bar {
    background-color: $background-color-white;
    height: rem(50px);
  }
  .my-achievement .second-tab .cube-tab_active {
    color: $blue-tab-color;
  }
  .my-achievement .second-tab .cube-tab-bar-slider {
    height: rem(4px);
    background: $blue-tab-color;
    width: rem(90px) !important;
    margin-left: rem(50px) !important;
  }
</style>