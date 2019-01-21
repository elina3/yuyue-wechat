<template>
  <div :id="elmId" class="funnel-echarts-wrap" :style="{width: echartsWidth, height: echartsHeight}">
  </div>
</template>

<script>
//node_modules
import echarts from 'echarts/lib/echarts';
import line from 'echarts/lib/chart/line';
import tooltip from 'echarts/lib/component/tooltip';
import legend from 'echarts/lib/component/legend';

export default {
    data(){
        return {
            echartsObj:''
        }
    },
    props:{
        type: String,
        echartsWidth: String,
        echartsHeight: String,
        option:{
            type: Object,
        },
        elmId: String
    },
    watch:{
        option:{
            handler(val, oldVal){
                if(this.echartsObj){
                    this.echartsObj.setOption(this.option, true);
                }
            },
            deep: true
        }
    },
  created() {
      this.initPage();
  },
  methods: {
      initPage(){
            //根据this.type类型引入对应的组件
            console.log(this.type);
            import('echarts/lib/chart/' + this.type).then(() => {
                this.initEcharts();
            });
      },
      initEcharts(){
            let echartsDom = document.getElementById(this.elmId);
            this.echartsObj = echarts.init(echartsDom);
            this.echartsObj.setOption(this.option, true);
            window.addEventListener("resize",() => {              
                this.echartsObj.resize();
            });
      }
  }
};
</script>

<style lang="scss" scoped>

</style>
