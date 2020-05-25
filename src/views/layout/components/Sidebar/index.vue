<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.meta.active || $route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#F4F5F7"
      text-color="#172B4D"
      active-text-color="#6772E4"
      @select="selectLeftNav"
      :router="true"
    >
      <div class="system-title">
        <svg-icon icon-class="logo"></svg-icon>
        <span v-if="sidebar.opened">外协组包一体</span>
      </div>
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import store from '@/store'

export default {
  name: 'Layout',
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'visitedViews'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {
    selectLeftNav(index) {
      this.$nextTick(() => {
        if (index === this.$route.path) {
          store.commit('reload')
        }
        store.dispatch('delCachedView', this.$route).then(() => {
          store.dispatch('addCachedView', this.$route)
        })
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/variables.scss';
#app {
  .system-title{
    width: 220px;
    height: 70px;
    line-height: 70px;
    font-size: 22px;
    padding: 0 20px;
    background-color: $color_6570E3;
    color: $white;
    transition: width .3s;
    .svg-icon{
      font-size: 24px;
      margin-right: 10px;
    }
  }
}
</style>
