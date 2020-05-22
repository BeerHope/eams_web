<template>
  <el-dialog 
    custom-class="common-dialog" 
    width="36%"
    @close="closeDialog"
    :visible.sync="dialogVisible">
    <el-form class="common-form" ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="name" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="ename" prop="ename">
        <el-input v-model="formData.ename"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancel" @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" class="purple-btn" @click="addTest">新增</el-button>
    </span>
  </el-dialog>
</template>
<script>

export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      formData: {
        name: '',
        ename: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写name', trigger: 'blur' }
        ],
        ename: [
          { required: true, message: '请填写ename', trigger: 'blur' }
        ]
      }
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
      this.$refs.form.resetFields()
    },
    addTest() {
      console.log('模拟新增操作')
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
