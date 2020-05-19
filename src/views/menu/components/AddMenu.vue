<template>
  <el-dialog width="36%" @close="closeDialog" :visible.sync="dialogVisible" :title="dialogTitle">
    <el-form class="common-form" ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="formData.name" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item label="优先级" prop="showOrder">
        <el-input-number v-model="formData.showOrder" :min="1" :max="1000"></el-input-number>
      </el-form-item>
      <el-form-item label="菜单类型" prop="type">
        <el-select v-model="formData.type" placeholder>
          <el-option
            v-for="item in menuTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="前端标识" prop="className">
        <el-input v-model="formData.className"></el-input>
      </el-form-item>
      <el-form-item label="后端标识" prop="permissionIdentifier">
        <el-input v-model="formData.permissionIdentifier" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="formData.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancel" type="primary" @click="dialogVisible = false">取消</el-button>
      <el-button class="purple-btn" type="primary" @click="addMenu">新增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { menuTypes } from '@/utils/dictionary'
import { addMenu } from '@/api/menu'
export default {
  name: '',
  components: {},
  props: {
    parentMenu: {
      type: Object,
      default: () => {}
    }
  },
  directive: {},
  data() {
    return {
      dialogVisible: false,
      menuTypes,
      formData: {
        showOrder: 1,
      },
      rules: {
        name: [
          { required: true, message: '请填写名称', trigger: 'blur'}
        ],
        type: [
          { required: true, message: '请选择菜单类型', trigger: 'blur'}
        ],
        showOrder: [
          { required: true, message: '请选择优先级', trigger: 'blur'}
        ],
        className: [
          { required: true, message: '请填写前端标识', trigger: 'blur'}
        ],
        permissionIdentifier: [
          { required: true, message: '请填写后端标识', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    dialogTitle() {
      return `${this.parentMenu.name} -> 新增子菜单`
    }
  },
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
    addMenu() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const reqData = _.assign(this.formData, {
            parentId: this.parentMenu.id
          })
          addMenu(reqData).then(res => {
            this.dialogVisible = false
            this.$emit('refresh')
            this.$message.success('新增成功！')
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
