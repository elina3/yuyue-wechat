<template>
  <div class="dash-board">
    <ul class="tab" v-if="footIsShow">
      <li class="tab-item" v-for="(item, index) in tabArr" :key="item.label" @click="changeTab(index)">
        <router-link :to="item.path" class="router">
          {{item.label}}
        </router-link>
      </li>
    </ul>
    <div class="today-title" v-if="footIsShow">
      <p v-show="!choosedAdviserArr.choosedItem.length">所有销售顾问</p>
      <p v-show="choosedAdviserArr.choosedItem.length">
        已选{{choosedAdviserArr.choosedItem.length}}名销售顾问
      </p>
      <p class="choose-ba" @click="chooseAdviser">选择销售顾问</p>
    </div>
    <router-view :choosedAdviserArr="choosedAdviserArr"></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {getDashboard} from '@/services/dashboard';

export default {
  data() {
    return {
      currentIndex: 0,
      tabArr: [
        {
          label: '今日',
          path: '/dashBoard/today'
        },
        {
          label: '本周',
          path: '/dashBoard/weekday'
        },
        {
          label: '本月',
          path: '/dashBoard/month'
        },
        {
          label: '累计',
          path: '/dashBoard/total'
        }
      ],
      choosedAdviserArr: {
        idArr: [],
        adviserItems: [],
        choosedItem: []
      },
      contentData: {}
    };
  },
  computed: {
    ...mapGetters(['footIsShow'])
  },
  methods: {
    changeTab(index) {
      this.currentIndex = index;
    },
    chooseAdviser() {
      this.$router.push('/dashBoard/chooseAdviser');
    }
  }
};
</script>
<style lang="scss" scoped>
.dash-board {
  font-size: rem($font-size-medium);
  .today-title {
    display: flex;
    justify-content: space-between;
    padding: 0 rem(16px);
    height: rem(45px);
    align-items: center;
    font-size: rem(14px);
    .choose-ba {
      color: $blue-tab-color;
    }
  }
  .tab {
    display: flex;
    height: rem(50px);
    background-color: #fff;
    .tab-item {
      flex: 1;
      text-align: center;
      height: rem(30px);
      margin-top: rem(20px);
      .router {
        display: inline-block;
        height: rem(27px);
      }
    }
    .router-link-active {
      color: $blue-tab-color;
      border-bottom: rem(3px) solid $blue-tab-color;
    }
  }
}
</style>
