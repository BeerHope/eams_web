<template>
  <el-dialog :append-to-body="true"
    width="36%" :visible.sync="dialogVisible"
    custom-class="common-dialog" title="订阅管理"
    @close="closeDialog" @open="getSubscriptionList">
    <el-form ref="form" label-width="68px" v-loading="loading">
      <el-form-item label="收件邮箱">
        <div class="email-box" @click.stop="toFocusTextInput('toEmailInput')">
          <span class="email-item" v-for="item in toEmails" :key="item+Math.random()">
            <span>{{item}}</span>
            <span class="close" @click="removeToEmail(item)"><i class="el-icon-close"></i></span>
          </span>
          <el-input v-model="toEmail" ref="toEmailInput" @keyup.native="addToEmails($event)" class="text-input"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="抄送邮箱">
        <div class="email-box" @click.stop="toFocusTextInput('ccEmailInput')">
          <span class="email-item" v-for="item in ccEmails" :key="item+Math.random()">
            <span>{{item}}</span>
            <span class="close" @click="removeCcEmail(item)"><i class="el-icon-close"></i></span>
          </span>
          <el-input v-model="ccEmail" ref="ccEmailInput" @keyup.native="addCcEmails($event)" class="text-input"></el-input>
        </div>
      </el-form-item>
      <el-form-item class="m-b-0" label="提示:">
        <span>输入邮箱按";"分隔</span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" v-if="$checkBtnPermission('subscription.save')" class="purple-btn" @click="updateSubscription">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {validateEmail} from '@/utils/validate'
import {getSubscriptionList, updateSubscription} from '@/api/subscription'
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      loading: false,
      toEmail: '',
      ccEmail: '',
      // 收件邮箱
      toEmails: [],
      // 抄送邮箱
      ccEmails: [],
      tosErrorInds: [],
      ccsErrorInds: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    closeDialog() {
      this.ccEmails = ''
      this.toEmail = ''
    },
    getSubscriptionList() {
      this.loading = true
      getSubscriptionList().then(res => {
        this.loading = false
        const resData = res.data.data
        this.ccEmails = resData.ccs
        this.toEmails = resData.tos
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    updateSubscription() {
      const reqData = {
        ccs: _.cloneDeep(this.ccEmails),
        tos: _.cloneDeep(this.toEmails)
      }
      updateSubscription(reqData).then(res => {
        this.$message.success('保存成功')
      }).catch(err => {
        console.log(err, '更新报错')
      })
    },
    toFocusTextInput(textInputDom) {
      this.$refs[textInputDom].focus()
    },
    addToEmails(e) {
      const keyCode = e.keyCode
      if (keyCode === 13) {
        e.preventDefault();
      }
      if (keyCode === 186) {
        const email = this.toEmail.replace(';', '')
        if (email && !validateEmail(email)) {
          this.$message.error('输入邮箱格式不符,请修改！')
          this.toEmail = email
        } else {
          this.toEmails.push(email)
          this.toEmail = ''
        }
      }
    },
    addCcEmails(e) {
      const keyCode = e.keyCode
      if (keyCode === 13) {
        e.preventDefault();
      }
      if (keyCode === 186) {
        const email = this.ccEmail.replace(';', '')
         if (email && !validateEmail(email)) {
          this.$message.error('输入邮箱格式不符, 请修改！')
          this.ccEmail = email
        } else {
          this.ccEmails.push(email)
          this.ccEmail = ''
        }
      }
    },
    removeToEmail(email) {
      this.toEmails = _.filter(this.toEmails, (item) => {
        return item !== email
      })
    },
    removeCcEmail(email) {
      this.ccEmails = _.filter(this.ccEmails, (item) => {
        return item !== email
      })
    },
    isErrorEmail(errorInds, index) {
      return _.includes(errorInds, index)
    }
  }
}
</script>

<style lang='scss'>
$color_dbdbdb:#dbdbdb;
$color_6B77ED:#6B77ED;
.email-box{
  padding: 4px 10px;
  line-height: 28px;
  border: 1px solid $color_dbdbdb;
  height: 200px;
  overflow: auto;
  border-radius: 4px;
  .text-input{
    outline: none;
    min-width: 120px;
    display: inline-block;
    height: 28px;
    line-height: 28px;
    width: auto !important;
    .el-input__inner {
      height: 28px;
      border: none;
      width: auto !important;
      padding: 0;
    }
  }
  .email-item{
    line-height: 20px;
    margin-right: 10px;
    display: inline-block;
    margin:0 10px 4px 0;
    padding: 4px 10px;
    border-radius: 4px;
    background-color: #eee;
    cursor: pointer;
    &:hover{
      background-color: $color_6B77ED;
      color: #fff;
    }
    .close{
      width: 28px;
      height: 28px;
      border-radius: 50%;
      &:hover{
        background-color: #fff;
        i{
          font-size: 14px;
          color: $color_6B77ED;
        }
      }
    }
  }
}
</style>
