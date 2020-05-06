<template>
  <el-dialog 
    title="新增白名单" width="36%" 
    custom-class="common-dialog" 
    :visible.sync="dialogVisible"
    @close="closeDialog">
    <el-form ref="form" class="common-form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="工厂名称" prop="factoryId">
        <el-select v-model="formData.factoryId" clearable>
          <el-option 
            v-for="item in factoryList" :key="item.value" 
            :value="item.value" :label="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工位IP" prop="ip">
        <el-input v-model="formData.ip"></el-input>
      </el-form-item>
      <el-form-item label="工位MAC" prop="mac">
        <el-input v-model="formData.mac"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancel" @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" class="green-btn" @click="addWhitelist">新增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { validateIP, validateMac } from '@/utils/validate'
import { addWhitelist } from '@/api/whitelist'
export default {
  name: '',
  components: {},
  props: {
    factoryList: {
      type: Array,
      default: () => []
    }
  },
  directive: {},
  data() {
    const checkIP = (rule, value, callback) => {
      if (!validateIP(value)) {
        callback(new Error('请填写合法的工位IP'))
      } else {
        callback()
      }
    }
    const checkMac = (rule, value, callback) => {
      if (!validateMac(value)) {
        callback(new Error('请填写合法的工位MAC'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      formData: {
        factoryId: '',
        ip: '',
        mac: ''
      },
      rules: {
        factoryId: [
          { required: true, message: '请选择工厂名称', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '请填写工位IP', trigger: 'blur' },
          { validator: checkIP, trigger: 'blur' }
        ],
        mac: [
          { required: true, message: '请填写工位MAC', trigger: 'blur' },
          { validator: checkMac, trigger: 'blur' }
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
    addWhitelist() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.formData, '提交的数据！！！')
          addWhitelist(this.formData).then(res => {
            this.$message.success('新增白名单成功!')
            this.dialogVisible = false
            this.$emit('refresh')
          })
        }
      })
    },
    closeDialog() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
