<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-input class="filter-item" v-model="filter.workOrderNumber" placeholder="生产订单号" clearable></el-input>
      <el-button class="purple-btn" type="primary" @click="getResourceList">
        <i class="el-icon-search m-r-4"></i>搜索
      </el-button>
    </div>
    <el-table
      v-loading="listLoading" :data="resourceList"
      border highlight-current-row
      style="width: 100%">
      <el-table-column prop="workOrderNumber" label="生产订单号" align="center"></el-table-column>
      <el-table-column prop="updateResourceTime" label="操作时间" min-width="120px" align="center"></el-table-column>
      <el-table-column label="操作" min-width="120px" align="center">
        <template slot-scope="scope">
          <!-- v-if="$checkBtnPermission('role.update')" -->
          <el-button type="primary" v-if="$checkBtnPermission('resource.download')" :disabled="!scope.row.updateResourceTime" @click="downloadResource(scope.row.id)" class="purple-btn" size="mini">下载资料</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-show="total>0"
      class="common-pagination"
      @size-change="getResourceList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="filter.pageSize"
      @current-change="getResourceList"
      :current-page.sync="filter.page">
    </el-pagination>
  </div>
</template>

<script>
/* 暂时模拟写 todo(后面根据真是的接口) */
import { getResourceList, downloadResource } from '@/api/resource'
export default {
  name: '',
  props: {},
  directive: {},
  data() {
    return {
      listLoading: false,
      filter:{
        workOrderNumber: '',
        page: 1,
        pageSize: 20
      },
      resourceList: [],
      total: 0,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getResourceList()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getResourceList() {
      this.listLoading = true
      getResourceList(this.filter).then(res => {
        const resData = res.data.data
        this.resourceList = resData.rows
        this.total = resData.totalRecord
        this.listLoading = false
      }).catch(err => {
        console.log(err, '资源管理')
        this.listLoading = false
      })
    },
    /* 下载文件 */
    downloadResource(id) {
      downloadResource(id).then(res => {
        if (_.isUndefined(res.code)) {
          const blob = new Blob([res.data], {type: 'application/octet-stream'})
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = this.resolveFilename(res.headers)
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          link.remove();
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log('资源下载失败', err)
      })
    },
    // 解析名称
    resolveFilename(headers) {
      let filename = ''
      const dispositionArr = headers['content-disposition'].split(';')
      for (const item of dispositionArr) {
        if (_.indexOf(item, '=') > -1) {
          const keyValueArr = item.split('=')
          if (keyValueArr[0]==='filename'){
            filename = keyValueArr[1]
            break
          }
        }
      }
      return filename
    }
  },
}
</script>

<style lang='scss' scoped>

</style>
