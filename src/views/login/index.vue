<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="myForm">
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" class="code" v-model="ruleForm.code"></el-input>
          <el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="ruleForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="Login" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      value ? callBack() : callBack(new Error('您必须同意无条件被我们蒙骗'))
    }
    return {
      ruleForm: {
        mobile: '',
        code: '',
        check: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机格式不正确' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }
        ],
        check: [ { validator } ]
      }
    }
  },
  methods: {
    Login () {
      this.$refs.myForm.validate(isOk => {
        if (isOk) {
          // 验证通过
          this.$axios.post('/authorizations', this.ruleForm).then(res => {
            window.localStorage.setItem('user-token', res.data.token)
            this.$router.push('/')
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
  height: 100vh;
  .login-card {
    width: 440px;
    height: 350px;
    .title {
      text-align: center;
      img {
        height: 45px;
      }
    }
    .code {
      width: 65%;
    }
  }
}
</style>
