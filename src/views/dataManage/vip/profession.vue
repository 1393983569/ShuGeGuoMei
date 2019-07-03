<template>
  <div>
    <el-container>
      <el-aside width="100px" class="asideClass1">
        营业概况
      </el-aside>
      <el-main>
        <el-progress :percentage="percentage" :color="customColor" />
        <el-progress :percentage="percentage" :color="customColor" />
        <el-progress :percentage="percentage" :color="customColor" />
        <el-progress :percentage="percentage" :color="customColor" />
        <el-progress :percentage="percentage" :color="customColor" />
        <el-progress :percentage="percentage" :color="customColor" />
        <el-progress :percentage="percentage" :color="customColor" />
        <el-progress :percentage="percentage" :color="customColor" />
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      customColor: '#409eff',
      percentage: 40
    }
  }
}
</script>
<style>
/* .asideClass1 {
  color: #333;
  background-color: #CCCCCC;
  text-align: center;
  line-height:200px;
  margin:0px;
  padding:0px;
} */
</style>
