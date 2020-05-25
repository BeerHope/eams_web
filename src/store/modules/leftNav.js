import NProgress from 'nprogress' // progress bar

const leftNav = {
  state: {
    isRouterAlive: true
  },
  mutations: {
    reload(state) {
      NProgress.configure({ showSpinner: false })
      NProgress.start()
      state.isRouterAlive = false
      setTimeout(() => {
        state.isRouterAlive = true
        NProgress.done()
      }, 200);
    }
  }
}
export default leftNav