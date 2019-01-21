<template>
  <div>
    <loading></loading>
  </div>
</template>

<script>
import Loading from '@/components/loading/loading';
import { mapGetters } from "vuex";

export default {
  components:{
    Loading
  },
  computed: {
    ...mapGetters(['wxInfo'])
  },
  mounted() {
    if (this.wxInfo.roleId === 2) {
      this.$router.push('/sellerRank')
    } else if (this.wxInfo.roleId === 3) {
      this.$router.push('/myRank');
    } else if (!this.wxInfo) {
      this.$router.push('/errorAuthor');
    }
  },
  data(){
    return {

    }
  }
}
</script>
