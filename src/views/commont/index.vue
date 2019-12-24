<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">评论管理</template>
        </bread-crumb>
        <el-table :data="list">
            <el-table-column prop="title" width="600px" label="标题"></el-table-column>
            <el-table-column :formatter="formatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
            <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
            <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
            <el-table-column prop="" label="操作">
                <template slot-scope="obj">
                <el-button size="small" type="text">修改</el-button>
                <el-button @click="openOrClose(obj.row)" size="small" type="text">{{ obj.row.comment_status ? '关闭' : '打开' }}评论</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" style="height:80px" align="middle">
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
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getCommont()
    },
    getCommont () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    formatterBoolean (row, column, cellvalue, index) {
      return cellvalue ? '正常' : '关闭'
    },
    openOrClose (row) {
      console.log(row.id)
      let mes = row.comment_status ? '关闭' : '打开'
      console.log(mes)
      this.$confirm(`您是否要${mes}评论`, '提示').then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(res => {
          this.getCommont()
        })
      }).catch((error) => {
        return Promise.reject(error)
      })
    }
  },
  created () {
    this.getCommont()
  }
}
</script>

<style>

</style>
