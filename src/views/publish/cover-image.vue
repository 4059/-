<template>
  <div class="cover-img">
      <div @click="openDialog(index)" v-for="(item, index) in list" :key="index" class="cover-img-item">
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <el-dialog :visible="dialogVisible" @close='closeDialog' title="选择封面图片">
          <!-- 监听 -->
          <select-image @selectOneImg='receiveImg'></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false, // 用来控制弹层开关
      selectIndex: -1 // 存储点击图片的下标
    }
  },
  methods: {
    receiveImg (url) {
    //   props只能读取不能修改
      this.$emit('selectOneImg', url, this.selectIndex)
      this.closeDialog() //  关闭弹层
    },
    openDialog (index) {
      this.selectIndex = index
      this.dialogVisible = true
    },
    closeDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-img {
    margin:20px 50px;
    display: flex;
    .cover-img-item {
        border: 1px solid #ccc;
        width: 250px;
        height: 250px;
        padding: 10px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
