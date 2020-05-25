<template>
  <el-dialog
    width="40%"
    title="文件上传"
    @close="closeDialog"
    custom-class="common-dialog upload"
    :visible.sync="dialogVisible">
    <el-upload
      v-loading="loading"
      ref="upload"
      class="upload-demo t-c"
      drag
      :action="uploadUrl"
      :headers="headers"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :on-change="uploadChange"
      :on-remove="removeFile"
      :limit="1">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <!-- <div class="el-upload__tip" slot="tip"></div> -->
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" class="purple-btn" @click="handleUpload">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getToken } from '@/utils/auth'
import { importOrder } from '@/api/order'
export default {
  name: 'Upload',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      file: null,
      loading: false
    }
  },
  computed: {
    uploadUrl() {
      return `${process.env.APP_BASE_API}/eams/order/import`
    },
    headers() {
      return {
        token: getToken()
      };
    }
  },
  watch: {},
  created() {
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    uploadChange(file, fileList) {
      const acceptTypes = ['xlsx', 'xls']
      const type = file.name.slice(file.name.lastIndexOf('.') + 1)
      const isAcceptedType = _.includes(acceptTypes, type)
      const isLt5M = file.size / 1024 / 1024 <= 5;
      if (!isAcceptedType) {
        this.$message.error('检测到当前上传的文件格式不是excel文件格式?')
      }
      if (!isLt5M) {
        this.$message.error('上传文件不能超过5M')
      }
      if (!isAcceptedType || !isLt5M) {
        this.$refs.upload.clearFiles()
        return
      }
      // 保存文件
      this.file = file
    },
    handleExceed(files, fileList) {
      this.$message.warning('上传文件数量超限, 只允许上传单个文件')
    },
    handleUpload() {
      if (this.loading) {
        this.$message.warning('文件正在上传，请耐心等待！')
        return
      }
      const upload = this.$refs.upload
      if (!upload.uploadFiles.length) {
        this.$message.warning('请先上传文件')
        return
      }
      this.loading = true
      const formData = new FormData()
      formData.append('file', this.file.raw)
      importOrder(formData).then(res => {
        this.loading = false
        this.$message.success('文件上传成功!')
        this.dialogVisible = false
        this.$emit('refresh')
      }).catch(() => {
        this.loading = false
      })
    },
    removeFile() {
      this.$refs.upload.clearFiles()
      this.file = null
    },
    closeDialog() {
      this.$refs.upload.clearFiles()
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
