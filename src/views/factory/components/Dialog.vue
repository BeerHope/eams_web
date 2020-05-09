<template>
  <el-dialog
    custom-class="common-dialog "
    width="36%" :visible.sync="dialogVisible"
    title="新增工厂"
    @close="closeDialog">
    <el-form class="common-form" ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item prop="factoryName" label="工厂名称">
        <el-input v-model="formData.factoryName" @input="change($event)"></el-input>
      </el-form-item>
      <!-- 此处的线别填写的是excel表中的线别，用于将excel表中的关联工厂 -->
      <el-form-item prop="customerName" label="线别">
        <el-input v-model="formData.customerName"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" class="green-btn" @click="addFactory">新增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { checkFactoryName, addFactory } from '@/api/factory'
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      formData: {
        foctoryName: '',
        customerName: '', // 客户标识，将工厂跟excel表中的线别关联对应
      },
      rules: {
        factoryName: [
          { required: true, message: '请填写工厂名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在2到50个字符', trigger: 'blur'}
        ],
        customerName: [
          { required: true, message: '请填写线别', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在2到50个字符', trigger: 'blur'}
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
    change(e) {
      this.$forceUpdate()
    },
    addFactory() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          addFactory(this.formData).then((res) => {
            this.dialogVisible = false
            this.$message.success('新增工厂成功!')
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
