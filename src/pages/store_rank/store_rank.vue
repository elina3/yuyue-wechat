<template>
  <div class="seller-wrapper">
    <div class="achievement" ref="pageTop">
      <p class="title">门店业绩统计(本月)</p>
      <ul class="item-wrapper">
        <li
          class="item"
          v-for="item in achievement"
          :key="item.name">
          <div class="item-text">
            <p><span v-if="item.isMoney">&yen;&nbsp;</span>{{item.num}}</p>
            <p>{{item.name}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="rank">
      <p class="title">门店排名</p>
      <template>
        <cube-tab-bar v-model="selectedLabel" show-slider>
          <cube-tab v-for="item in tabs" :label="item.label" :key="item.label">
        </cube-tab>
        </cube-tab-bar>
        <cube-tab-panels v-model="selectedLabel">
          <cube-tab-panel :label="item.label" v-for="item in tabs" :key="item.label">
            <div class="scroll-height" style="height: 290px;">
              <cube-scroll
                ref="scroll"
                :data="item.children"
                >
                <ul v-if="item.children.length">
                  <li v-for="(item, index) in item.children" :key="index" class="sell-item">
                    <p>
                      <span class="item-num">{{index + 1}}</span><span class="avatar"></span><span>{{item.storeName}}</span>
                    </p>
                    <p>
                      <span v-if="selectedLabel === '销售额' || selectedLabel === '客单价'">&yen;</span>
                      <span v-if="selectedLabel === '销售额' || selectedLabel === '客单价'">{{item.value.toFixed(2)}}</span>
                      <span v-if="selectedLabel === '会员招募' || selectedLabel === '复购数'">{{item.value}}</span>
                    </p>
                  </li>
                </ul>
                <div v-if="!item.children.length" class="no-data">暂无数据！</div>
              </cube-scroll>
            </div>
          </cube-tab-panel>
        </cube-tab-panels>
      </template>
    </div>
  </div>
</template>

<script>
import { getStoreList, getStoreCount } from "@/services/store_rank";

export default {
  components:{},
  props:{},
  data(){
    return {
      achievement: [
        {
          num: 1,
          name: "销售额（元）",
          isMoney: true
        },
        {
          num: 1,
          name: "会员招募数量"
        },
        {
          num: 1,
          name: "平均客单价（元）",
          isMoney: true
        },
        {
          num: 1,
          name: "复购会员数量"
        }
      ],
      selectedLabel: '销售额',
      tabs: [
        {
          label: '销售额',
          children: []
        },
        {
          label: '会员招募',
          children: []
        },
        {
          label: '客单价',
          children: []
        },
        {
          label: '复购数',
          children: []
        }
      ]
    }
  },
  computed:{},
  mounted(){
    this.getStoreListMsg('saleAmount');
    this.getStoreListMsg('repeat');
    this.getStoreListMsg('atv');
    this.getStoreListMsg('recruit');
    this.getStoreCountMsg();
  },
  methods:{
    getStoreCountMsg() {
      getStoreCount({countType: 'month'}).then(res => {
        if (res.code === 200) {
          this.achievement[0].num = res.data.saleAmount.toFixed(2);
          this.achievement[1].num = res.data.recruit;
          this.achievement[2].num = res.data.atv.toFixed(2);
          this.achievement[3].num = res.data.repeat;
        }
      }).catch(err => {
        console.log('err', err);
      })
    },
    getStoreListMsg(type) {
      let params = {
        countType: 'month',
        countContent: type
      }
      getStoreList(params).then(res => {
        if (res.code === 200) {
          if (type === 'saleAmount') {
            this.tabs[0].children = res.data.list;
          } else if (type === 'recruit') {
            this.tabs[1].children = res.data.list;
          } else if (type === 'atv') {
            this.tabs[2].children = res.data.list;
          } else if (type === 'repeat') {
            this.tabs[3].children = res.data.list;
          }
        }
      }).catch(err => {
        console.log('err', err);
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.seller-wrapper{
  font-size: rem($font-size-medium);
  color: $main-text-color;
  background-color: $background-color-white;
  .title {
    margin: rem(20px) 0;
    font-size: rem($font-size-medium-x);
    font-weight: bold;
  }
  .achievement {
    padding: 0 rem(16px) rem(20px) rem(16px);
    overflow: hidden;
    .item-wrapper {
      width: 100%;
      .item {
        float: left;
        width: calc(50% - 5px);
        height: rem(70px);
        line-height: rem(70px);
        border-radius: rem(3px);
        color: #ffffff;
        &:nth-child(2n) {
          margin-left: 10px;
        }
        &:nth-child(1) {
          background-image: linear-gradient(-135deg, #e36bdb 0%, #fe5eb1 100%);
        }
        &:nth-child(2) {
          background-image: linear-gradient(-135deg, #f38667 0%, #fda23f 100%);
        }
        &:nth-child(3) {
          margin-top: rem(10px);
          background-image: linear-gradient(-135deg, #9b57fd 0%, #d78afe 100%);
        }
        &:nth-child(4) {
          margin-top: rem(10px);
          background-image: linear-gradient(-135deg, #1dbdb7 0%, #3de792 100%);
        }
        .item-text {
          display: inline-block;
          line-height: normal;
          vertical-align: middle;
          margin-left: rem(24px);
          p:first-child {
            font-size: rem($font-size-medium-x);
          }
          p:last-child {
            font-size: rem($font-size-small);
          }
        }
      }
    }
  }
  .rank {
    padding: 0 rem(16px);
    background-color: $background-color-white;
    .sell-item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      @include border-1px-bottom($border-color);
      .avatar {
        display: inline-block;
        height: rem(40px);
        width: rem(40px);
        border-radius: 50%;
        background-color: #ccc;
        vertical-align: middle;
        margin: rem(20px);
      }
      .item-num {
        margin-left: rem(10px);
      }
    }
  }
}
.no-data {
  text-align: center;
  margin-top: rem(30px);
}
</style>

<style lang="scss">
  .rank {
    .cube-tab-bar {
      height: rem(50px);
      .cube-tab {
        div {
          font-weight: bold;
        }
      }
      .cube-tab_active {
        color: $blue-tab-color;
      }
      .cube-tab-bar-slider {
        background-color: $blue-tab-color;
      }
    }
  }
</style>