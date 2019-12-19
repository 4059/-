<template>
  <el-container>
    <el-aside><asided></asided></el-aside>
    <el-container>
      <el-header>头</el-header>
      <el-main>主要区域</el-main>
    </el-container>
  </el-container>
</template>

<script>
import aside from '../../components/home/aside'
export default {
  components: {
    // 标签冲突
    'asided': aside
  }
}
</script>

<style>

</style>
