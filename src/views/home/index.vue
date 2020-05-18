<template>
  <div class="home">
    <div class="content">
      <div class="home-bg">
        <img src="@/assets/images/home_bg.png" alt="首页背景图">
      </div>
      <div class="desc">
        <div>欢迎使用</div>
        <span>welcome</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang='scss' scoped>
.home{
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .content{
    text-align:center;
    margin-top: -40px;
    margin-left: -40px;
    .home-bg{
      img{
        width: 66%;
      }
    }
    .desc{
      padding-left: 44px;
      >div{
        font-size: 34px;
        color: #333;
        letter-spacing: 1px;
      }
      span{
        color: #666666;
        font-size: 24px;
        letter-spacing: 2px;
        display: inline-block;
        margin-top: 10px;
      }
    }
  }
  
}
</style>
