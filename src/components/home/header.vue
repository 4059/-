<template>
  <el-row type="flex" align="middle">
          <el-col class="left" :span="12">
            <i class='el-icon-s-fold'></i>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col class="right" :span="12">
            <el-row type="flex" justify="end" align="middle">
              <img :src="userInfo.photo ? userInfo.photo : defauiltImg" alt="">
              <el-dropdown @command="clickMenu">
                <span class="el-dropdown-link">
                  {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="info">个人信息</el-dropdown-item>
                  <el-dropdown-item command="git">git</el-dropdown-item>
                  <el-dropdown-item command="lgout">退出</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
            </el-row>
          </el-col>
        </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defauiltImg: require('./../../assets/img/avatar.jpg')
    }
  },
  methods: {
    clickMenu (command) {
      if (command === 'info') {

      } else if (command === 'git') {

      } else {
        localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  },
  created () {
    let token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      this.userInfo = res.data.data
      console.log(res)
    })
  }
}
</script>

<style lang="less" scoped>
.left{
  span{
    margin-left: 5px;
  }
}
.right{
  img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 8px;
  }
}
</style>
