<template>
  <div class="choose-adviser">
    <div class="title">请选择销售顾问</div>
    <div class="all-adviser">
      <!-- <input type="checkbox" v-model="checked" @change="toggleAllChoose"/>所有销售顾问 -->
      <cube-checkbox  v-model="checked" shape="square" @change.native="toggleAllChoose">所有销售顾问</cube-checkbox>
    </div>
    <div class="choose-sigle-wrap">
      <cube-scroll
        ref="scroll"
        :data="choosedAdviserArr.adviserItems"
        :options="options"
        @pulling-up="onPullingUp">
        <cube-checkbox-group v-model="choosedAdviserArr.idArr" :options="choosedAdviserArr.adviserItems" shape="square" />
      </cube-scroll>
    </div>
    <div class="button">
      <cube-button @click="goBack">确定</cube-button>
    </div>
  </div>
</template>

<script>
import {getAdviserLists} from '@/services/dashboard';

export default {
  props: {
    choosedAdviserArr: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    options() {
      return {
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      }
    },
    pullUpLoadObj() {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {
          more: this.pullUpLoadMoreTxt,
          noMore: this.pullUpLoadNoMoreTxt
        }
      } : false;
    }
  },
  data(){
    return {
      // 全选开关
      checked: false,
      // 所有顾问的id集合
      allAdviserId: [],
      pullUpLoad: false,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '已加载完毕',
      pageObj: {
        totalNum: 0,
        limit: 12,
        offset: 0,
      }
    }
  },
  watch: {
    "choosedAdviserArr.idArr":function(val) {
      // 判断全选的对钩是否打上
      if(val.length === this.choosedAdviserArr.adviserItems.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
      // 把选中的顾问放在choosedItem中
      const valLength = val.length;
      const adviserItems = this.choosedAdviserArr.adviserItems;
      const adviserItemsLength = adviserItems.length;
      this.choosedAdviserArr.choosedItem = [];
      for (let i = 0 ; i < valLength; i++) {
        for (let j = 0; j < adviserItemsLength; j++) {
          if (val[i] === adviserItems[j].value) {
            this.choosedAdviserArr.choosedItem.push(adviserItems[j])
          }
        }
      }
    }
  },
  mounted() {
    this.getAdviserListMsg();
  },
  methods:{
    // 上滑加载
    onPullingUp() {
      setTimeout(() => {
        if (Number(this.pageObj.totalNum) > Number(this.pageObj.offset)) {
          // 如果有新数据
          this.getAdviserListMsg();
        } else {
          // 如果没有新数据
          this.pullUpLoad = false;
          // this.$refs.scrollRef.forceUpdate();
        }
      }, 1000);
    },
    // 获取顾问
    getAdviserListMsg() {
      let params = {
        limit: this.pageObj.limit,
        offset: this.pageObj.offset
      };
      getAdviserLists(params).then(res => {
        if (res.code === 200) {
          this.choosedAdviserArr.adviserItems = [];
          if (res.data.list.length) {
            res.data.list.forEach(item => {
              // 把请求的顾问存在choosedAdviserArr.adviserItems，渲染出来
              this.choosedAdviserArr.adviserItems.push({
                label: item.name,
                value: item.staffId
              });
            });
            // 把请求回来的顾问id值存在allAdviserId
            if (this.choosedAdviserArr.adviserItems.length) {
              this.choosedAdviserArr.adviserItems.forEach(item => {
                if (this.allAdviserId.indexOf(item.value) === -1) {
                  this.allAdviserId.push(item.value);
                }
              })
            }
            // 如果一进来已经选中的顾问和总的顾问数量一样，则把checked设置true
            if (this.choosedAdviserArr.idArr.length === this.choosedAdviserArr.adviserItems.length) {
              this.checked = true;
            } else {
              this.checked = false;
            }
            // 如果checked为真，那么下滑加载的内容也要选中
            if (this.checked) {
              this.choosedAdviserArr.idArr = JSON.parse(JSON.stringify(this.allAdviserId));
            }
          }
          //这是总数据
          this.pageObj.totalNum = res.data.count;
          //判断是否相等
          if (
            res.data.count ==
            Number(this.pageObj.offset) + Number(this.pageObj.limit)
          ) {
            this.pullUpLoad = false;
          } else {
            this.pullUpLoad = true;
          }
          //请求下一次
          this.pageObj.offset =
            Number(this.pageObj.offset) + Number(this.pageObj.limit);
        }
      }).catch(err => {
        console.log('err', err);
      })
    },
    // 全选或不选
    toggleAllChoose() {
      if (this.checked) {
        this.choosedAdviserArr.idArr = JSON.parse(JSON.stringify(this.allAdviserId));
      } else {
        this.choosedAdviserArr.idArr = [];
      }
    },
    goBack() {
      this.$router.back();
    }
  }
}
</script>
<style lang="scss" scoped>
.choose-adviser{
  font-size: rem($font-size-medium);
  color: $main-text-color;
  margin-bottom: rem(60px);
  .title {
    height: rem(40px);
    line-height: rem(40px);
    padding-left: rem(16px);
  }
  .all-adviser {
    height: rem(47px);
    line-height: rem(47px);
    background-color: #fff;
    margin-bottom: rem(10px);
    padding-left: rem(16px);
  }
  .button {
    position: absolute;
    bottom: rem(20px);
    width: 100%;
    box-sizing: border-box;
    padding: 0 rem(16px);
  }
  .choose-sigle-wrap {
    position: absolute;
    top: rem(97px);
    bottom: rem(85px);
    left: 0;
    right: 0;
  }
}
</style>

<style lang="scss">
  .choose-adviser .cube-checkbox_checked .cube-checkbox-ui i {
    color: $blue-tab-color;
  }
  .choose-adviser .cube-btn {
    background-color: $blue-tab-color;
    letter-spacing: rem(6px);
  }
  .with-click{
    .cube-checkbox-label {
      a {
        position: relative;
        z-index: 1;
      }
    }
  }
</style>