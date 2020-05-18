<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <div class="fix-top">
        <navbar/>
        <tags-view/>
      </div>
      <app-main/>
    </div>
  </div>
</template>


<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',

  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>
<style lang="scss">
  @import "@/styles/variables.scss";
  .btn-icon{ margin-right: 5px;}
  .el-message-box  .el-button--primary{  background: $color_6B77ED !important;border-color: $color_6B77ED !important;}
  .el-select .el-input.is-focus .el-input__inner {border-color: $color_6B77ED;}
  .el-select-dropdown__item.selected{ color: $color_6B77ED;  }
  .el-select .el-input__inner:focus{ color: $color_6B77ED;}
  .el-input.is-active .el-input__inner, .el-input__inner:focus{border-color: $color_6B77ED; }
  .el-select .el-input__inner:focus{border-color: $color_6B77ED; }
  .el-message-box__btns{ text-align: center  !important;}
  .el-pagination__sizes .el-input .el-input__inner:hover{ border-color: $color_6B77ED;}

  .el-message-box  .el-button:hover {
    border-color: #c6e2ff ;
    background-color: #ecf5ff ;
  }
  .el-message-box .el-message-box__btns{  text-align: center;}
  .el-pager li.active{ background: $color_6B77ED !important; color: white !important; }
  .menu-wrapper li.el-menu-item.submenu-title-noDropdown:hover {
    background: #E2E4E9 !important ;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
