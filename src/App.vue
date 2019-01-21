<template>
  <div id="app">
    <router-view />
    <div
      v-if="footIsShow"
      class="tabbar-wrapper"
      ref="bottomTabbar"
    >
      <ul class="tabbar">
        <li
          class="tabbar-item"
          v-for="item in tabs"
          :key="item.label"
        >
          <router-link :to="item.path">
            <i
              class="mz-icon"
              :class="item.icon"
            ></i>
            <p class="tab-text">{{item.label}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="mod-layer">
      <div class="mod-layer-content">
        <i class="mod-layer-icon"></i>
        <p class="mod-layer-desc">为了更好的体验，请使用竖屏浏览</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { loginCheck } from '@/services/login';

export default {
  name: "App",
  data() {
    return {
      tabs: [],
      managementPage: [
        {
          label: "导购排名",
          icon: "seller-rank-icon",
          path: "/sellerRank"
        },
        {
          label: "门店排名",
          icon: "store-rank-icon",
          path: "/storeRank"
        },
        {
          label: "数据看板",
          icon: "dashboard-icon",
          path: "/dashBoard"
        }
      ],
      BAPage: [
        {
          label: "我的排名",
          icon: "my-rank-icon",
          path: "/myRank"
        },
        {
          label: "我的业绩",
          icon: "my-achievement-icon",
          path: "/myAchievement"
        }
      ]

    };
  },
  created() {
    this.loginCheckMsg();
  },
  computed: {
    ...mapGetters(["footIsShow", "wxInfo"])
  },
  mounted() {
    // 实时拿到bottomTab的高度，存到vuex中；
    setTimeout(() => {
      if (this.footIsShow) {
        this.setTabHeight(this.$refs.bottomTabbar.offsetHeight);
      }
    }, 20);
  },
  methods: {
    ...mapMutations({
      setTabHeight: "SET_BOTTOMTABHEIGHT"
    }),
    loginCheckMsg() {
      loginCheck().then(res => {
        if (res.code === 200) {
          if (!res.data.wxInfo) {
            console.log(res.data);
          } else {
            if (res.data.wxInfo.roleId === 2) {
              this.tabs = this.managementPage;
            } else {
              this.tabs = this.BAPage;
            }
          }
          
        }
      }).catch(err => {
        console.log('err', err);
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.tabbar-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  height: rem(57px);
  background-color: #fff;
  font-size: rem($font-size-small-s);
  overflow: hidden;
  .tabbar {
    display: flex;
    height: rem(57px);
    align-items: center;
    @include border-1px($border-color);
    .tabbar-item {
      flex: 1;
      text-align: center;
      .tab-text {
        margin-top: rem(3px);
        font-weight: bold;
      }
    }
  }
}
.mz-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: 100%;
  background-repeat: no-repeat;
}
.seller-rank-icon {
  background-image: url("./common/images/adviser_icon.png");
}
.store-rank-icon {
  background-image: url("./common/images/store_icon.png");
}
.dashboard-icon {
  background-image: url("./common/images/dashboard_icon.png");
}
.my-rank-icon {
  background-image: url("./common/images/my_rank_icon.png");
}
.my-achievement-icon {
  background-image: url("./common/images/my_achievement_icon.png");
}

.router-link-active {
  color: $blue-tab-color;
  .seller-rank-icon {
    background-image: url("./common/images/adviser_icon_active.png");
  }
  .store-rank-icon {
    background-image: url("./common/images/store_icon_active.png");
  }
  .dashboard-icon {
    background-image: url("./common/images/dashboard_icon_active.png");
  }
  .my-rank-icon {
    background-image: url("./common/images/my_rank_icon_active.png");
  }
  .my-achievement-icon {
    background-image: url("./common/images/my_achievement_icon_active.png");
  }
}
</style>
<style>
#app .bscroll-vertical-scrollbar {
  opacity: 0 !important;
  visibility: hidden !important;
}

@keyframes rotation {
  10% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
  }
  50%,
  60% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  90% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
  }
  100% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
  }
}
.mod-layer {
  display: none;
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #000;
  font-size: 14px;
  z-index: 9997;
}
.mod-layer-content {
  position: absolute;
  width: 100%;
  top: 45%;
  margin-top: -75px;
  text-align: center;
}
.mod-layer-icon {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAADaCAMAAABU68ovAAAAXVBMVEUAAAD29vb////x8fH////////x8fH5+fn29vby8vL////5+fn39/f6+vr////x8fH////////+/v7////09PT////x8fH39/f////////////////////x8fH///+WLTLGAAAAHXRSTlMAIpML+gb4ZhHWn1c2gvHBvq1uKJcC6k8b187lQ9yhhboAAAQYSURBVHja7d3blpowFIDhTUIAOchZDkre/zE7ycySrbUUpsRN2/1fzO18KzEqxEVgTiZNfgmmtxRc8iaR8HNe8x4BtjQePKayYCIoyBSgvNNE1AkNSHqZyLqk97EgUCCHBzZ5mkg7ScvIJuIyOyXBRFxgpqWZyGsAZLB1KjsJi8nutHU4JCRbFRH8tmirI9k8Jx2sqNs8K/m0LQkrktO2crgcgXGB4AiTEsB0hJfo9MGgX7CGcYiYwQxmMOOvZwRhBG8tCoMXjBDeXvWCEcHbi14wgCBmMIMZzGAGM5jxETNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxY6E2rUQxnH2tz9cirlJFwFBJedaPnUv0M7++egPDE8iAJcIDmxwH5wwv9vUviw2kLbVO3TJU5uul/EyB0FoLp4x60PdGUd3qPurrWyjGGTc05u+1dcgI7/+tCCPARWGhH7o5Y7RCf+bH9ctXLp6v2BVDxfqz0oPXeSVaNtINo/1SXDv4dck8IIkbhtC2ol+iouEonTBCbYvVMnXOjxww6s/RFrBUpXHh/gw1rHj5d/qhYn9Gpk2FWh6xRBRX5Oj3Znh2Sq49/L6+y8pB26q9GbE2dbA2mVbx6I+7MfBglLCttm73ZQi7AD3iL4HqjFYJHSPRppqaUaJ3ATpGa+ckpGak2hRRMyqjGMkvl+xyFeSMwjAqcsZgGDdyhl0oNTnDN4yenJGZFGxNChP5/Y3efh6SM2rDOJMzboYxkDMqwyjIGcIw6F+io2FU1IxIm1JqRmgXSkvNKNCXeTpGrU0JNSO2c6LIGPgCS8AuDHz9ta0SXWDtxoDRH+MqlbC2Dt2G2JFRadtQZt2qq/orGowdGb2euxYiqWEpVWhTBnszoNAPdStuQwxqf0aocdWKW4Z+DfszIh8pxJqbuCE4YAC+4bm0evtipjpgJHeFnyyt1Ku2xa0bhjxr27p75rECNwyI9ZwvXkHq+7aTaMEV44YYy/spfgjgjNHaWW+GeUhGEX7tLlVinIFDDSgnOwhi1V6bU0b6tVS9eAERe863g4dRrtiHdc6o+nn5vtyVVgR79Cqt4uL6gfHPQyGqtP2vf7HADGbcYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JjhtOM+J/AgT008yDMkN/dPP9hzS8zAMQN3OEYeekp5YU7KOKXwVXqiY+QS7smcinGKABWdiBgpPJTSMHJ4KidhhPBUSMLw4CmPhKHgKUXCkHsygum71ftNSgCX6bsl8FQyfbcL5EdYsDk0R3j7aiA5wpt5AjKg/2gLJEBD/0Hf2OOf/vRrj6z/7GtP4B3nMKyjHA12kIPSjnJs3FEO0TvKkYJHOWCR+rjJH0Vn6fI5PjNbAAAAAElFTkSuQmCC);
  display: inline-block;
  width: 67px;
  height: 109px;
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  -webkit-animation: rotation infinite 1.5s ease-in-out;
  animation: rotation infinite 1.5s ease-in-out;
  background-size: 67px;
}
.mod-layer-desc {
  margin-top: 20px;
  font-size: 15px;
  color: #fff;
}
@media screen and (min-aspect-ratio: 13 / 8) {
  .mod-layer {
    display: block;
  }
}
</style>
