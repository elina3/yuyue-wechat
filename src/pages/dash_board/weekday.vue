<template>
  <div v-if="contentData">
    <child :timeType="timeType" :contentData="contentData"></child>
  </div>
</template>

<script>
import { getDashboard } from '@/services/dashboard'
import Child from './child'

export default {
  components:{
    Child
  },
  props: {
    choosedAdviserArr: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  mounted() {
    this.getDashboardMsg();
  },
  data(){
    return {
      // 今日数据
      contentData: {},
      timeType: 'week'
    }
  },
  methods:{
    getDashboardMsg() {
      let params = {
        selectStaffIds: this.choosedAdviserArr.idArr.join(','),
        countType: this.timeType
      }
      getDashboard(params).then(res => {
        if (res.code === 200) {
          this.contentData = res.data
        }
      }).catch(err => {
        console.log('err', err);
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>