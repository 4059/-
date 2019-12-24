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
          v-model="searchForm.dateRange"
          type="daterange"
          range-separator="——"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>{{ searchForm.value }}
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top:10px">
    <el-row slot="header">共找到0条符合条件的内容</el-row>
    <div class="art-item" v-for="item in 10" :key="item">
        <div class="left">
            <img src="./../../assets/img/admire.png" alt="">
            <div class="info">
                <span class="title">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
                <el-tag class="tag">标签</el-tag>
                <span class="date">2019</span>
            </div>
        </div>
        <div class="right">
            <span class="el-icon-edit">修改</span>
            <span class="el-icon-delete">删除</span>
        </div>
    </div>
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
      channels: [] // 接收频道数据
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels() // 获取频道
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
        }
    }
}
</style>
