<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import store from '@/store'
export default{
  name: 'App',
  methods:{
  },
  computed: {
    activeName: {
      get () {
        return this.$route.name
      },
      set (value) {
        this.$router.replace({ name: value })
      }
    }
  },
  mounted() {
    document.onclick = () => {
      store.commit('SET_TOKEN_EXPIRED', false)
    }
  }
}
</script>
