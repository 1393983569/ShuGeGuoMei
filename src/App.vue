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
</style>
