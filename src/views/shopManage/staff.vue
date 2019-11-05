<template>
  <div>
    <el-table :data="dataTable" style="width:40%;" size="mini">
      <el-table-column prop="id" label="序号"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="rank" label="职级"/>
      <el-table-column prop="mobile" label="电话"/>
    </el-table>
  </div>
</template>
<script>
export default {
  data(){
    return {
      dataTable:[]
    }
  },
  props:['staffTable'],
  watch:{
    'staffTable'(e){
      this.dataTable = e
    },
  },
  mounted(){}
}
</script>
<style>

</style>
