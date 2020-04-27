<template>
  <div class="work-order-details">
    <el-form label-width="140px" ref="form">
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
          <el-form-item label="MAC:">
            <span>{{details.mac}}</span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item label="订单ID:">
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
          <!-- <span>{{details.log}}</span> -->
          <el-input readonly v-model="details.log" clearable type="textarea" :autosize="{ minRows: 6, maxRows: 20}"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
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
      getLogDetails(this.logId).then(res => {
        const resData = res.data.data
        this.details = resData
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
.work-order-details{
  padding: 40px 20px;
  .el-form{
    width: 60%;
    max-width: 1000px;
    min-width: 600px;
    margin: auto;
    padding: 30px 50px;
    background: rgba(248, 248, 248, 0.8);
    min-height: calc(100vh - 164px);
  }
}
</style>
