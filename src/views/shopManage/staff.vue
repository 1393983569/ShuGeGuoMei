<template>
  <div>
    <el-table :data="dataTable" style="width:40%;" size="mini">
      <el-table-column prop="id" label="序号"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="roleId" label="职级">
        <template slot-scope="scope">
          <p v-if="scope.row.roleId==='05'">店长</p>
          <p v-if="scope.row.roleId==='06'">收银</p>
          <p v-if="scope.row.roleId==='07'">店铺财务</p>
          <p v-if="scope.row.roleId==='08'">库管</p>
          <p v-if="scope.row.roleId==='09'">采购</p>
        </template>
      </el-table-column>
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
