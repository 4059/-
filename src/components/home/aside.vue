<template>
<div class="asided">
  <div class="logo">
    <img src="./../../assets/img/logo_admin.png" alt="">
  </div>
  <!-- :router="ture" 完整写法 -->
  <el-menu router background-color="#323745" text-color="#adafb5">
      <el-menu-item>
        <span slot="title" index="/home">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <span slot="title">内容管理</span>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">文章列表</el-menu-item>
        <el-menu-item index="/home/commont">评论管理</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <span slot="title">粉丝管理</span>
        <el-menu-item index="/home/data">图文数据</el-menu-item>
        <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fanspic">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item>
        <span slot="title" index="/home/userinfo">账户信息</span>
      </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.asided{
  background: #323745;
  width: 230px;
  height: 100vh;
  .logo{
    text-align: center;
    background: #2e2f32;
    padding: 10px 0;
    img{
      height: 35px;
    }
  };
  .el-menu{
    border-right:none
  }
}
</style>
