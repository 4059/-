<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">发布文章</template>
      </bread-crumb>
      <el-form ref="publishForm" :model="formData" :rules="rules" style="margin-left:50px">
          <el-form-item prop="title" label="标题" label-width="60px">
              <el-input v-model="formData.title" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="内容" label-width="60px">
              <el-input v-model="formData.content" type="textarea" :rows='4'></el-input>
          </el-form-item>
          <el-form-item prop="cover" label="封面">
            <el-radio-group v-model="formData.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="channel_id" label="频道">
              <el-select v-model="formData.channel_id">
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button @click="publishArtile()" type="primary">发布</el-button>
              <el-button @click="publishArtile(true)">存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      rules: {
        title: [{ required: true, message: '文章标题不能为空' }, { min: 5, max: 30, message: '标题长度是在5-30个字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channels_id: [{ required: true, message: '文章频道不能为空' }]
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    publishArtile (draft) {
      this.$refs.publishForm.validate(res => {
        if (res) {
          // 判断是修改文章还是发布文章
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(() => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$router.push('/home/articles')
          }).catch(() => {})
        }
      })
    },
    // 通过id查询文章
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  watch: {
    $route: function (to, from) {
      if (to.params.articleId) {

      } else {
        this.formData = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params
    articleId && this.getArticleById(articleId) // 如果id存在，查询文章的数据
  }
}
</script>

<style>

</style>
