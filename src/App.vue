<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
.size-color{
  font-size:18px;
  color:#6e7b99;
  font-weight:bold;
}
.size-color div{
  display: inline-block;
  /* vertical-align: top; */
}
.title-size-color{
  font-size:24px;
  color:#4a5a7f;
}
body{
  font-size:18px;
  color:#6e7b99;
  /* font-weight:bold; */
  font-family:Microsoft YaHei;
}
.body-margin{
  /*margin:20px;*/
}
body .el-table th.gutter{
  display: table-cell!important;
}
body .el-table thead{
 background: #3A71A8;
}
/*body .el-table colgroup.gutter{*/
  /*display: table-cell!important;*/
/*}*/
</style>
