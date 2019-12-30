<template>
  <el-tabs v-model="activeName">
      <el-tab-pane label="素材库" name="material">
        <div class="select-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img @click="clickImg(item.url)" :src="item.url" alt="">
          </el-card>
        </div>
        <!-- 放置分页组件 -->
        <el-row>
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="page.pageSize"
            :current-page="page.currentPage"
            :total="page.total"
            @current-change='changePage'
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传图片" name="upload">
        <el-upload class="upload-img" :http-request="uploadImg" action="" :show-file-list="false">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        this.$emit('selectOneImg', res.data.url)
      })
    },
    // 点击图片触发
    clickImg (url, index) {
      // 自定义事件，子传父,事件名全小写，这里可以不用
      this.$emit('selectOneImg', url)
    },
    // 分页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      }).catch(() => {})
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang='less' scoped>
  .select-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-card {
      margin: 20px 0;
      width: 150px;
      height: 150px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .upload-img {
    display: flex;
    justify-content: center;
    i {
      font-size: 50px;
      padding: 50px;
      border: 1px solid #ccc;
      margin: 50px 0;
    }
  }
</style>
