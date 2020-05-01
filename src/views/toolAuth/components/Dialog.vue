<template>
  <el-dialog width="36%" custom-class="common-dialog">
    <el-form>
      <el-form-item>
        <el-input v-mdole="formData.ip"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-mdole="formData.mac"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancel">取消</el-button>
      <el-button type="primary" class="green-btn">确定</el-button>
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
      formData: {
        ip: '',
        mac: ''
      },
      rules: {
        ip: [
          { required: true, message: '请输入工厂IP', trigger: 'blur' }
        ],
        mac: [
          { required: true, message: '请输入mac', trigger: 'blur' }
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
  methods: {}
}
</script>

<style lang='scss' scoped>

</style>
