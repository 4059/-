<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>
      <div class="buju">
      <el-form class="form-class">
        <el-form-item label-width="60px" label="用户名">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label-width="60px" label="简介">
          <el-input v-model="formData.intro"></el-input>
        </el-form-item>
        <el-form-item label-width="60px" label="邮箱">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label-width="60px" label="手机号">
          <el-input disabled v-model="formData.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存信息</el-button>
        </el-form-item>
      </el-form>
        <el-upload class="tou" action="" :show-file-list="false">
        <img :src="formData.photo ? formData.photo : defaultImg" alt="">
        </el-upload>
      </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      defaultImg: require('../../assets/img/admire.png')
    }
  },
  methods: {
    getUser () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style lang='less' scoped>
.buju {
display: flex;
justify-content: space-evenly;
margin-top: 30px;
.form-class{
  width: 450px;
  text-align: center;
}
.tou {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  overflow: hidden;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
}
</style>
