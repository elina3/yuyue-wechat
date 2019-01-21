<template>
  <div class="chart-content">
    <div class="middle" v-if="JSON.stringify(chartData) != '{}'">
      <echarts :type="echartDealer.echartType" :echartsWidth="echartDealer.width" :echartsHeight="echartDealer.height" :option="echartDealer.option" :elmId="echartDealer.elmId"></echarts>
    </div>
    <div class="button">
      <cube-button @click="goBack">返回</cube-button>
    </div>
  </div>
</template>

<script>
import Echarts from "./lib/echarts";
import { getChartDashboard } from '@/services/dashboard'

export default {
  components:{
    Echarts
  },
  props:{
    choosedAdviserArr: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  created() {
    if (this.$route.query.countType === 'saleAmount') {
      this.echartDealer.option.legend.data[0].name="销售额";
      this.echartDealer.option.series[0].name="销售额";
      this.echartDealer.option.yAxis.name="元";
    } else if (this.$route.query.countType === 'recruit') {
      this.echartDealer.option.legend.data[0].name="会员招募";
      this.echartDealer.option.series[0].name="会员招募";
      this.echartDealer.option.yAxis.name="人";
    } else if (this.$route.query.countType === 'atv') {
      this.echartDealer.option.legend.data[0].name="客单价";
      this.echartDealer.option.series[0].name="客单价";
      this.echartDealer.option.yAxis.name="元";
    } else if (this.$route.query.countType === 'repeat') {
      this.echartDealer.option.legend.data[0].name="复购会员数量";
      this.echartDealer.option.series[0].name="复购会员数量";
      this.echartDealer.option.yAxis.name="人";
    } 
    this.getChartDashboardMsg();
  },
  data(){
    return {
      chartData: {},
      echartDealer: {
        elmId: "dealer",
        echartType: "line", //图表类型
        totalCount: 0,
        width: "100%",
        height: "400px",
        option: {
          color: ["#9C58FD"],
          tooltip: {
            trigger: "axis"
          },
          legend: {
            top: "4%",
            left: "center",
            data: [
              {
                name: '',
                icon: 'rect'
              }
            ]
          },
          grid: {
            left: "6%",
            right: "15%",
            // bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            name: "日期",
            data: []
          },
          yAxis: {
            type: "value",
            name: ""
          },
          series: [{
            name: "",
            type: "line",
            data: []
          }]
        }
      }
    }
  },
  methods:{
    getChartDashboardMsg() {
      let params = {
        selectStaffIds: this.choosedAdviserArr.idArr.join(','),
        countType: this.$route.query.timeType,
        countContent: this.$route.query.countType
      };
      getChartDashboard(params).then(res => {
        if (res.code === 200) {
          this.chartData = res.data.list;
          if (this.chartData && this.chartData.length > 0) {
            this.chartData.forEach(item => {
              this.echartDealer.option.xAxis.data.push(item.term);
              this.echartDealer.option.series[0].data.push(item.value);
            })
          }
        }
      }).catch(err => {
        console.log('err', err);
      })
    },
    goBack() {
      this.$router.back();
    }
  }
}
</script>
<style lang="scss" scoped>
  .chart-content {
    background-color: #ffffff;
    .button {
      position: absolute;
      bottom: rem(20px);
      width: 100%;
      box-sizing: border-box;
      padding: 0 rem(16px);
    }
  }
</style>
<style lang="scss">
  .chart-content .cube-btn {
    background-color: $blue-tab-color;
    letter-spacing: rem(6px);
  }
</style>