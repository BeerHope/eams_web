<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- 缓存tab中打开的页面 -->
      <keep-alive :include="cachedViews">
        <router-view :key="key" v-if="isRouterAlive"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    },
    isRouterAlive() {
      return this.$store.state.leftNav.isRouterAlive
    }
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 70 +34 */
  min-height: calc(100vh - 104px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-top: 104px;
  /* min-width: 1024px; */
}
</style>

