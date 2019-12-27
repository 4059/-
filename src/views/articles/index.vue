<template>
<div>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <el-form class="form-card">
      <el-form-item label="文章状态">
        <el-radio-group v-model="searchForm.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <el-select  placeholder="请选择" v-model="searchForm.channel_id">
            <el-option v-for="item in channels" :key='item.id' :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
          value-format='yyyy-MM-dd'
          v-model="searchForm.dateRange"
          type="daterange"
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top:10px">
    <el-row slot="header">共找到{{ page.total }}条符合条件的内容</el-row>
    <div class="art-item" v-for="item in list" :key="item.id.toString()">
        <div class="left">
            <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
            <div class="info">
                <span class="title">{{ item.title }}</span>
                <el-tag :type="item.status | filterType" class="tag">{{ item.status | filterStatus }}</el-tag>
                <span class="date">{{ item.pubdate }}</span>
            </div>
        </div>
        <div class="right">
            <span ><i class="el-icon-edit"></i>修改</span>
            <span @click="delArt(item.id)" ><i class="el-icon-delete"></i>删除</span>
        </div>
    </div>
    <el-row type="flex" justify="center" >
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :total="page.total"
            @current-change = "changePage"
            >
          </el-pagination>
        </el-row>
  </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5,
        channel_id: null,
        dateRange: []
      },
      page: {
        total: 0,
        pageSize: 10, // 限制最少10条
        currentPage: 1
      },
      channels: [], // 接收频道数据
      list: [], // 接收主体数据
      defaultImg: require('./../../assets/img/admire.png')
    }
  },
  filters: {
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    },
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    }
  },
  watch: {
    searchForm: {
      handler: function () {
        this.changeCondition()
      },
      deep: true
    }
  },
  methods: {
    delArt (id) {
      this.$confirm('是否删除文章？').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(res => {
          // 添加提示消息
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // 是否回到第一页看需求，添加页码赋值1
          this.getArticles()
        })
      }).catch(() => {})
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getConditionArtcles()
    },
    changeCondition () {
      this.page.currentPage = 1
      this.getConditionArtcles()
    },
    getConditionArtcles () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      this.getArticles(params)
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count // 获取总文章数
      })
    }
  },
  created () {
    this.getChannels() // 获取频道
    this.getArticles({ page: 1, per_page: 10 }) // 获取主体数据
  }
}
</script>

<style lang='less' scoped>
.form-card {
  margin-left: 50px;
}
.art-item {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #f2f3f5;
    .left{
        display: flex;
      img {
        width: 120px;
        height: 100px;
      }
      .info{
          margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .title {
            width: 800px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .tag {
            width: 60px;
            text-align: center;
        }
        .date {
            color: #999;
            font-size: 12px
        }
      }
    }
    .right {
        span {
            margin-right: 10px;
            cursor: pointer;
        }
    }
}
</style>
