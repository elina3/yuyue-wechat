<template>
  <div class="search-ui">
    <div class="search-box">
      <i class="icon-search"></i>
      <input :placeholder="placeholder" ref="query" v-model="query" class="box">
      <i class="icon-dismiss" v-show="query" @click="clear"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索"
    }
  },
  data() {
    return {
      query: ""
    };
  },
  created() {
    // 通过截留函数，如果在300毫秒内多次改变query,其实执行 this.$emit这个函数执行了一次，不会多次执行。也就是300毫秒后才执行一次
    this.$watch(
      "query",
      this.debounce(newQuery => {
        this.$emit("query", newQuery);
      }, 300)
    );
  },
  methods: {
    clear() {
      this.query = "";
      this.$emit('clear');
    },
    setQuery(query) {
      this.query = query;
    },
    blur() {
      this.$refs.query.blur();
    },
    debounce(func, delay) {
      let timer;
      return function(...args) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.search-ui {
  margin: rem(10px) rem(16px);
  background-color: #fff;
  .search-box {
    flex: 1;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: rem(36px);
    background-color: #f5f6f9;
    border-radius: rem(6px);

    .icon-search {
      width: rem(26px);
      height: rem(26px);
      display: inline-block;
      background-image: url('../../common/image/search1.png');
      background-size: 100% 100%;
    }

    .box {
      flex: 1;
      margin: 0 rem(5px);
      line-height: 18px;
      font-size: rem(15px);
      outline: 0;
      background-color: #f5f6f9;
      &::placeholder {
        color: #999999;
      }
    }

    .icon-dismiss {
      width: rem(20px);
      height: rem(20px);
      display: inline-block;
      background-image: url('../../common/image/close.png');
      background-size: 100% 100%;
      margin-right: rem(5px);
    }
  }
}

</style>
