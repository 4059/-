<template>
  <el-container>
    <el-aside style="width:230px">
      <asided></asided>
    </el-aside>
    <el-container>
      <el-header>
        <headers></headers>
      </el-header>
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import aside from '../../components/home/aside'
// import layheader from '../../components/home/header'
export default {

}
</script>
