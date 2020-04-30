<template>
  <div class="home">
    <div class="title">欢迎使用外协组包一体管理系统</div>
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
// $color_1DC9BB: #1dc9bb;
.home{
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .title{
    font-size: 48px;
    height: 160px;
    line-height: 160px;  
    letter-spacing: 4px;
    width: calc(100% - 28px);
    text-align: center;
    color: #fff;
    background-color: rgba(29, 201, 187, 0.88);
  }
}
</style>
