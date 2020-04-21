<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
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
  }
}
</script>
