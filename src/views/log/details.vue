<template>
  <div class="log-details">
    <el-card class="log-card">
      <h4 class="title">
        <span class="desc">设备生产详情</span>
      </h4>
      <el-form label-width="140px" ref="form" v-loading="detailsLoading">
        <el-row>
          <el-col :md="12">
            <el-form-item label="机身号:">
              <span>{{details.sn}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="生产状态:">
              <span>{{details.type|filterState(logTypes)}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="工位MAC:">
              <span>{{details.mac}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24">
            <el-form-item label="生产订单号:">
              <span>{{details.orderId}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="创建时间:">
              <span>{{details.createTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item class="el-col el-col-24" label="日志:">
            <el-input readonly v-model="details.log" clearable type="textarea" :autosize="{ minRows: 6, maxRows: 20}"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { logTypes} from '@/utils/dictionary'
import { getLogDetails } from '@/api/log'
import { filterState } from '@/filters'

export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  filters: {
    filterState,
  },
  data() {
    return {
      logTypes,
      detailsLoading: false,
      details: {
        sn: '',
        type: 0,
        mac: '',
        orderId: '',
        createTime: '',
        log: ''
      }
    }
  },
  computed: {
    logId() {
      return this.$route.params.logId
    }
  },
  watch: {},
  created() {
    this.getLogDetails()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getLogDetails() {
      this.detailsLoading = true
      getLogDetails(this.logId).then(res => {
        const resData = res.data.data
        this.details = resData
        this.detailsLoading = false
      }).catch(err => {
        console.log(err, '订单详情')
        this.detailsLoading = false
      })
    },
    handleCancel() {
      this.$store.dispatch('delView', this.$route)
      this.$router.push('../list')
    },
    updateOrder() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          updateOrder(_.omit(this.formData, ['updateBy', 'uodateTime']))
          .then(res => {
            this.$message.success('更新订单状态成功！')
            this.handleCancel()
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/styles/variables.scss";
.log-details{
  // padding: 40px 20px;
  background-color: $color_f8f8f8;
  .title{
    .desc{
      padding-left: 10px;
      border-left: 4px solid $color_6B77ED;
    }
  }
  .log-card{
    box-shadow: none;
    width: 70%;
    margin: auto;
    .el-card__body{
      padding: 20px 50px;
    }
  }
  .el-form{
    width: 90%;
    max-width: 1000px;
    min-width: 600px;
    margin: auto;
    padding: 30px 50px;
    min-height: calc(100vh - 188px);
  }
}
</style>
