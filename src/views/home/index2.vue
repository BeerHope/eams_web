<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
    
  </div>
</template>

<style>

</style>

<script>
import { mapGetters } from 'vuex';
import adminDashboard from './admin';



export default {
  name: 'Dashboard',
  components: { adminDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'usertype'
    ])
  },
  created() {

    this.currentRole = 'adminDashboard'
    // if (this.usertype===1) {   //运营人员
    //   this.currentRole = 'adminDashboard'
    // }
    // if (this.usertype===2) {   //
    //   this.currentRole = 'customerDashboard'
    // }
    // if (this.usertype===3) {   //
    //   this.currentRole = 'editorDashboard'
    // }

  }
}
</script>
