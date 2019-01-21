let baseOption = {
  elmId: "",
  echartType: "line",
  totalCount: 0,
  width: "375px",
  height: "400px",
  option: {
    color: [],
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
    series: [
      {
        name: "",
        type: "line",
        data: []
      }
    ]
  }
}

// // 销售数据
let echartSell = JSON.parse(JSON.stringify(baseOption));
echartSell.elmId = 'sell';
echartSell.option.color[0] = "#9C58FD";
echartSell.option.legend.data[0].name = "销售额";
echartSell.option.yAxis.name = "元";
echartSell.option.series[0].name = "销售额";

// 会员招募数量
let echartRecruit = JSON.parse(JSON.stringify(baseOption))
echartRecruit.elmId = 'recruit';
echartRecruit.option.color[0] = "#FE5EB2";
echartRecruit.option.legend.data[0].name = "会员招募数量";
echartRecruit.option.yAxis.name = "人";
echartRecruit.option.series[0].name = "会员招募数量";
// 复购会员数量
let echartRepeat = Object.assign({}, baseOption);
echartRepeat.elmId = 'repeat';
echartRepeat.option.color[0] = "#556EE2";
echartRepeat.option.legend.data[0].name = "复购会员数量";
echartRepeat.option.yAxis.name = "人";
echartRepeat.option.series[0].name = "复购会员数量";

export { echartSell, echartRecruit, echartRepeat };