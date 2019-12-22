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
                <el-button size="small" type="text">{{ obj.row.comment_status ? '关闭' : '打开' }}评论</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getCommont () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(res => {
        this.list = res.data.results
      })
    },
    formatterBoolean (row, column, cellvalue, index) {
      return cellvalue ? '正常' : '关闭'
    }
  },
  created () {
    this.getCommont()
  }
}
</script>

<style>

</style>
