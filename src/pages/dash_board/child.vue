<template>
  <div class="today">
    <div class="count">
      <div class="count-items">
        <div class="count-item" @click="toChartPage(timeType, 'saleAmount')">
          <div class="item-content">
            <p>{{contentData.saleAmount}}</p>
            <p>销售额（元）</p>
          </div>
        </div>
        <div class="count-item right" @click="toChartPage(timeType, 'recruit')">
          <div class="item-content">
            <p>{{contentData.recruit}}</p>
            <p>会员招募数量</p>
          </div>
        </div>
      </div>
      <div class="count-items">
        <div class="count-item" @click="toChartPage(timeType, 'atv')">
          <div class="item-content">
            <p>{{contentData.atv}}</p>
            <p>客单价（元）</p>
          </div>
        </div>
        <div class="count-item right" @click="toChartPage(timeType, 'repeat')">
          <div class="item-content">
            <p>{{contentData.repeat}}</p>
            <p>复购会员数量</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getDashboard} from '@/services/dashboard'

export default {
  components:{},
  props: {
    timeType: {
      type: String,
      default: 'today'
    },
    contentData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods:{
    // 跳转到图表页面
    toChartPage(type, countType) {
      if (this.timeType === 'today') {
        return;
      }
      this.$router.push({path: '/dashBoard/chartDashboard', query: {
        timeType: type,
        countType: countType
      }});
    }
  }
}
</script>
<style lang="scss" scoped>
.today {
  font-size: rem($font-size-medium);
  position: absolute;
  top: rem(90px);
  bottom: rem(57px);
  left: 0;
  right: 0;
  background-color: $background-color-white;
  overflow: scroll;
  .count {
    width: 100%;
    box-sizing: border-box;
    padding: rem(16px);
    .count-items {
      display: flex;
      margin-bottom: rem(16px);
      .count-item {
        flex: 1;
        height: rem(130px);
        background-color: $background-color;
        border-radius: rem(3px);
        display: flex;
        justify-content: center;
        align-items: center;
        .item-content {
          text-align: center;
          p:first-child {
            font-size: rem(24px);
          }
          p:last-child {
            font-size: rem(14px);
            color: #999999;
            line-height: rem(40px);
          }
        }
      }
      .right {
        margin-left: rem(15px);
      }
    }
  }
}
</style>