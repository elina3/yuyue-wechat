<template>
  <div class="commission-content-wrapper">
    <div class="commission-content-top">
      <div class="commisstion-item">
        <p>已结算佣金</p>
        <p>&yen; 8000</p>
      </div>
      <div class="commisstion-item">
        <p>冻结佣金</p>
        <p>&yen; 8000</p>
      </div>
      <div class="commisstion-item">
        <p>累计佣金</p>
        <p>&yen; 8000</p>
      </div>
    </div>
    <div class="my-rank-title">导购会员排行榜</div>
    <ul class="commission-content-bottom">
      <li v-for="(item, index) in storeList" :key="item.label" class="item">
        <div class="num">{{index + 1}}</div>
        <div class="store">
          <p>{{item.label}}</p>
          <p>
            <span
            span >结算佣金 &yen; {{item.jsCommissionMoney}}</span><span>冻结佣金 &yen; {{item.djCommissionMoney}}</span>
          </p>
        </div>
        <div class="money-num">
          <p>&yen; {{item.comsumptionMoney}}</p>
          <p>消费金额</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      storeList: [
        {
          label: '龙之梦1',
          jsCommissionMoney: 10000,
          djCommissionMoney: 2000,
          comsumptionMoney: 67000
        },
        {
          label: '龙之梦2',
          jsCommissionMoney: 100,
          djCommissionMoney: 200,
          comsumptionMoney: 6700
        },
        {
          label: '龙之梦3',
          jsCommissionMoney: 100,
          djCommissionMoney: 200,
          comsumptionMoney: 6700
        },
        {
          label: '龙之梦4',
          jsCommissionMoney: 100,
          djCommissionMoney: 200,
          comsumptionMoney: 6700
        },
        {
          label: '龙之梦5',
          jsCommissionMoney: 100,
          djCommissionMoney: 200,
          comsumptionMoney: 6700
        },
        {
          label: '龙之梦6',
          jsCommissionMoney: 100,
          djCommissionMoney: 200,
          comsumptionMoney: 6700
        }
      ]
    }
  },
  computed:{},
  mounted(){},
  methods:{},
}
</script>
<style lang="scss" scoped>
.commission-content-wrapper {
    .my-rank-title {
      padding-left: rem(20px);
      color: $main-text-color-s;
      line-height: rem(40px);
    }
    .commission-content-bottom {
      background-color: $background-color-white;
      margin-bottom: rem(70px);
      .item {
        display: flex;
        align-items: center;
        height: rem(70px);
        @include border-1px($border-color);
        .num {
          flex: 0 0 rem(25px);
          width: rem(25px);
          text-align: right;
          margin-left: rem(10px);
        }
        .store {
          flex: 1;
          margin-left: rem(20px);
          p:first-child {
            font-weight: bold;
            margin-bottom: rem(10px);
          }
          p:last-child {
            span {
              font-size: rem(13px);
              color: $main-text-color-ss;
              &:first-child {
                margin-right: rem(20px);
              }
            }
          }
        }
        .money-num {
          flex: 0 0 rem(95px);
          width: rem(95px);
          text-align: right;
          margin-right: rem(20px);
          p:first-child {
            font-size: rem($font-size-large);
            color: $blue-tab-color;
            margin-bottom: rem(10px);
          }
          p:last-child {
            font-size: $font-size-small-s;
            color: $main-text-color-ss;
          }
        }
      }
    }
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
        font-size: rem(20px);
        margin: 0 rem(15px);
      }
    }
    .commisstion-item + .commisstion-item {
      margin-left: 10px;
    }
  }
</style>