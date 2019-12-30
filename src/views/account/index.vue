<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>
      <div class="buju">
      <el-form ref="myForm" class="form-class" :model="formData" :rules="rules">
        <el-form-item label-width="70px" label="用户名" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label-width="70px" label="简介">
          <el-input v-model="formData.intro"></el-input>
        </el-form-item>
        <el-form-item label-width="70px" label="邮箱" prop="email">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label-width="70px" label="手机号">
          <el-input disabled v-model="formData.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveUser">保存信息</el-button>
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
      defaultImg: require('../../assets/img/admire.png'),
      rules: {
        name: [ { required: true, message: '用户名不能为空' }, { min: 1, max: 7, message: '用户名长度在1-7之间' } ],
        email: [{ required: true, message: '邮箱不能为空' }]
        // 再加一个正则验证邮箱
      }
    }
  },
  methods: {
    saveUser () {
      this.$refs.myForm.validate().then(res => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(res => {
          this.$message({
            type: 'success',
            message: '保存用户信息成功'
          })
        })
      })
      // 支持promise写法和回调函数写法
    },
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
