<template>
  <el-row class="menu">
    <el-col :xl="4" :lg="5" class="tree-wrapper">
      <el-tree
        ref="menuTree"
        :data="menuList"
        node-key="id"
        :default-expand-all="true"
        :expand-on-click-node="false"
        @node-click="handleTreeClick"
        :highlight-current="true"
        :props="defaultProps">
      </el-tree>
    </el-col>
    <el-col :xl="20" :lg="19" class="edit-form">
      <div class="tool t-r">
        <el-button v-if="menuType !== 3" type="primary" size="small" class="blue-btn m-r-20" @click="openAddDialog">
          <i class="el-icon-plus"></i> 
          新增子菜单
        </el-button>
      </div>
      <div class="form-wrapper">
        <el-form ref="form" :model="menuDetails" :rules="rules" label-width="120px">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="menuDetails.name" maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="菜单状态" prop="state">
            <el-select v-model="menuDetails.state">
              <el-option
                v-for="item in menuStates"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优先级" prop="showOrder">
            <el-input-number v-model="menuDetails.showOrder" :min="1" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="菜单类型" prop="type">
            <el-select v-model="menuDetails.type" placeholder>
              <el-option
                v-for="item in menuTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="前端标识" prop="className">
            <el-input v-model="menuDetails.className"></el-input>
          </el-form-item>
          <el-form-item label="后端标识" prop="permissionIdentifier">
            <el-input v-model="menuDetails.permissionIdentifier" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="menuDetails.remark"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="m-l-50 m-t-20 purple-btn" type="primary" @click="updateMenu">修改</el-button>
      </div>
    </el-col>
    <add-menu ref="addMenu" :parent-menu="menuDetails" @refresh="getMenuList"></add-menu>
  </el-row>
</template>

<script>
import { getMenuList, getMenuDetails, updateMenu } from "@/api/menu"
import { menuStates, menuTypes } from '@/utils/dictionary'
import AddMenu from './components/AddMenu'
import { Loading } from 'element-ui'
export default {
  name: '',
  components: {
    AddMenu
  },
  props: {},
  directive: {},
  data() {
    return {
      menuList: [],
      defaultProps: {
        label: 'name',
        children: 'child'
      },
      loading: false,
      isFirst: true,
      menuId: '',
      menuType: 3,
      menuStates,
      menuTypes,
      menuDetails: {},
      rules: {
        name: [
          { required: true, message: '请填写名称', trigger: 'blur'}
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'blur'}
        ],
        type: [
          { required: true, message: '请选择菜单类型', trigger: 'blur'}
        ],
        showOrder: [
          { required: true, message: '请设置优先级', trigger: 'blur'}
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
  computed: {},
  watch: {},
  created() {
    this.getMenuList()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getMenuList() {
      const loading = Loading.service()
      getMenuList().then(res => {
        this.menuList = [res.data.data]
        loading.close()
        this.$nextTick(() => {
          if (this.isFirst) {
            this.getDefaultKey(...this.menuList)
          }
          this.$refs.menuTree.setCurrentKey(this.menuId)
          this.getMenuDetails()
        })
      })
    },
    handleTreeClick(data) {
      this.isFirst = false
      this.menuId = data.id
      this.menuType = data.type
      this.$refs.menuTree.setCurrentKey(data.id)
      this.getMenuDetails()
    },
    getMenuDetails() {
      getMenuDetails(this.menuId).then(res => {
        this.menuDetails = res.data.data
        this.menuDetailsBak = _.cloneDeep(this.menuDetails)
      })
    },
    updateMenu() {
      /* 判断是否修改 */
      if(_.isEqual(this.menuDetails, this.menuDetailsBak)) {
        this.$message.warning('检测到数据未作修改！')
        return
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          const reqData = _.omit(this.menuDetails, ['id', 'level']) 
          updateMenu(this.menuId, reqData).then(res => {
            this.getMenuList()
            this.$message.success('修改菜单成功！')
          })
        }
      })
    },
    getDefaultKey(obj) {
      if (obj.child.length) {
        this.getDefaultKey(obj.child[0])
      } else {
        this.menuId = obj.id
        this.menuType = obj.type
        console.log(this.menuType, 'menuType！！！！！！！！')
      }
    },
    openAddDialog() {
      this.$refs.addMenu.dialogVisible = true
    }
  }
}
</script>

<style lang='scss' scoped>
.menu{
  margin: 10px 16px;
  position: absolute;
  width: calc(100% - 32px);
  height: calc(100% - 20px);
  .tree-wrapper{
    height: 100%;
    overflow: auto;
  }
  .tool{
    height: 50px;
    line-height: 50px;
    box-shadow: 0 1px 10px 0 rgba(0,0,0,0.1);
  }
  .form-wrapper{
    max-width: 560px;
    min-width: 400px;
    width: 46%;
    margin: 80px auto auto;
    text-align: right;
  }
  .edit-form{
    height: 100%;
    overflow-y: auto;
  }
}
@media screen and (max-height: 900px){
  .menu{
    .form-wrapper{
      margin: 30px auto auto;
    }
  }
}
</style>
