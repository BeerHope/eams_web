<template>
  <div class="role-dialog">
    <el-dialog
      custom-class="common-dialog"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="36%"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-form
        v-loading="loading" class="common-form"
        ref="form" :rules="rules" :model="formData"
        label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item v-if="flag!==0" label="状态" prop="state">
          <el-select v-model="formData.state" class="w-100">
            <el-option 
              v-for="item in roleStates" :key="item.value" 
              :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色菜单" prop="menus" :class="['tree-wrapper']">
          <el-tree
            show-checkbox
            node-key="id"
            ref="authTree"
            :data="menuList"
            :default-expand-all="true"
            :props="defaultProps"
            @check="changeCheck"
          ></el-tree>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="formData.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="cancel" @click="dialogVisible = false">取消</el-button>
        <el-button v-if="flag === 0" type="primary" class="green-btn" @click="addRole">新增</el-button>
        <el-button v-if="flag === 1" type="primary" class="green-btn" @click="updateRole">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMenus, addRole, getRoleDetails, updateRole } from '@/api/role'
export default {
  name: "",
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      flag: 0,
      roleId: -1,
      loading: false,
      dialogVisible: false,
      formData: {
        name: '',
        state: '',
        remark: '',
        menus: []
      },
      rules: {
        name: [
          {
            required: true,
            message: "请填写角色名称",
            trigger: "blur"
          }
        ],
        state: [
          {
            required: true,
            message: '请勾选角色状态',
            trigger: "blur"
          }
        ],
        menus: [
          {
            required: true,
            message: '请勾选角色权限',
            trigger: "blur"
          }
        ]
      },
      menuList: [],
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      roleStates: [
        {
          value: 1,
          label: '启用'
        },
        {
          value: 2,
          label: '禁用'
        }
      ]
    };
  },
  computed: {
    dialogTitle() {
      return !this.flag ? '新增角色' : '编辑角色'
    }
  },
  watch: {},
  created() {
    this.getMenus()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    async getMenus() {
      const res = await getMenus()
      this.menuList = [res.data.data]
      console.log(this.menuList, 'this.menuList!!!!!!!!!')
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.$refs.authTree.setCheckedKeys([])
      this.dialogVisible = false;
    },
    handleOpen() {
      /* 编辑 */
      if (this.roleId !== -1) {
        this.loading = true
        getRoleDetails(this.roleId).then(res => {
          this.formData = _.cloneDeep(res.data)
          this.$refs.authTree.setCheckedKeys(this.formData.menus)
          setTimeout(() => {
            this.loading = false
          }, 150)
        })
      }
    },
    changeCheck(curData, checkedData) {
      if (!checkedData.checkedKeys.length) {
        this.$refs.form.validateField('menus')
      }
    },
    // 新增角色
    addRole() {
      this.formData.menus = this.$refs.authTree.getCheckedKeys()
      this.$refs.form.validate((valid) => {
        if (valid) {
          addRole(this.formData).then(res => {
            this.$emit('refresh')
            this.dialogVisible = false
            this.$message.success('新增角色成功')
          })
        }
      })
    },
    // 更新角色
    updateRole() {
      const { roleId } = this
      const reqData = _.cloneDeep(this.formData)
      reqData.menus = this.$refs.authTree.getCheckedKeys()
      updateRole(roleId, reqData).then(res => {
        this.$emit('refresh')
        this.dialogVisible = false
        this.$message.success(this.$t('base.tips.editSuccess'))
      })
    }
  }
};
</script>

<style lang="scss">
.role-dialog{
  .tree-wrapper{
    .el-form-item__content{
      height: 200px !important;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      padding: 12px;
      overflow: auto;
    }
  }
}
</style>
