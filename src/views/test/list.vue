<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20"> 
      <el-input class="filter-item" v-model="filter.name" placeholder="name" clearable></el-input>
      <el-input class="filter-item" v-model="filter.ename" placeholder="ename" clearable></el-input>
      <!-- <el-select class="filter-item" v-model="filter.state" placeholder="状态" clearable>
        <el-option 
          v-for="item in bindStates" :key="item.value" 
          :value="item.value" :label="item.label">
        </el-option>
      </el-select> -->
      <el-button class="purple-btn" type="primary" @click="getTestList">
        <i class="el-icon-search m-r-4"></i>搜索
      </el-button>
      <el-button v-if="$checkBtnPermission('device.batchUnbind')" class="purple-btn" type="primary" @click="exportTest">
        <svg-icon icon-class="unbind-icon" class="m-r-4"></svg-icon>导出
      </el-button>
      <el-button v-if="$checkBtnPermission('device.batchUnbind')" class="blue-btn" type="primary" @click="openDialog">
        <i class="el-icon-plus"></i>新增
      </el-button>
    </div>
    <el-table
      v-loading="listLoading" :data="testList"
      border highlight-current-row
      style="width: 100%">
      <el-table-column prop="name" label="name" align="center"></el-table-column>
      <el-table-column prop="ename" label="ename" min-width="120px" align="center"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-show="total>0"
      class="common-pagination"
      @size-change="getTestList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="filter.pageSize"
      @current-change="getTestList"
      :current-page.sync="filter.page">
    </el-pagination>
    <test-dialog ref="testDialog"></test-dialog>
  </div>
</template>

<script>
import TestDialog from './components/Dialog'
/* 暂时模拟写 todo(后面根据真是的接口) */
import { getTestList } from '@/api/test'
export default {
  name: '',
  components: {
    TestDialog
  },
  props: {},
  directive: {},
  data() {
    return {
      listLoading: false,
      filter:{
        name: '',
        ename: '',
        page: 1,
        pageSize: 20
      },
      testList: [
        {
          name: 'test001',
          ename: 'test123213213213',
        },
        {
          name: 'test001',
          ename: 'test123213213213',
        }
      ],
      total: 0,
    }
  },
  computed: {},
  watch: {},
  created() {
    console.log('测试模块！！！')
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getTestList() {
      console.log('get test list!!!')
    },
    openDialog() {
      this.$refs.testDialog.dialogVisible = true
    },
    /* 导出 */
    exportTest() {
      console.log('测试导出操作')
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
