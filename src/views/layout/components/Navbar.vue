<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb class="breadcrumb-container"/>
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item"/>
        </el-tooltip>
      </template>
      <span style="line-height: 55px; position:relative">{{username}} </span>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <span>{{name}}</span>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="updatePassword">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided v-if="$checkBtnPermission('subscription.list')">
            <span style="display:block;" @click="toSubscription">订阅管理</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <find-pass ref="findPass"></find-pass>
    <subscription ref="subscription"></subscription>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import { updatePassword } from '@/api/user.js'
import FindPass from './FindPass'
import Subscription from './Subscription'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker,
    FindPass,
    Subscription
  },
  data() {
    return {
      showIframePass: false,
      closeIfram:"closeIfram"
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device',
      'username'
    ])
  },
  created() {
    const self = this
    window[this.closeIfram] = () => {
      self.showIframePass = false
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar');
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload();// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    updatePassword() {
      this.$refs.findPass.dialogVisible = true
    },
    toSubscription() {
      this.$refs.subscription.dialogVisible = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 70px;
    line-height: 70px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 78px;
      height: 70px;
      float: left;
      padding: 0 10px;
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      display: flex;
      align-items: center;
      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 40px;
      }
      .avatar-container {
        height: 50px;
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: -2px;
          position: relative;
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }

    .el-dialog__wrapper {
      .el-dialog__header{
        line-height: 30px;
      }
    }
  }
  .password-block {
    position: relative;

    button {
      position: fixed;
      z-index: 3001;
    }
    // .masks {
    //   position: fixed;
    //   top: 0;
    //   right: 0;
    //   bottom: 0;
    //   left: 0;
    //   background: rgba(0,0,0,.1);
    //   z-index: 2999;
    // }
  }
  .el-icon-caret-bottom{ font-size: 23px !important; top: 15px !important;}
  .el-dropdown-menu__item--divided{ margin-top:0; }
</style>
