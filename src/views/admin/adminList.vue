<template>
  <el-table
    :data="dataList"
    :header-cell-style="{  textAlign: 'center'}"
    center
    stripe
  >
    <el-table-column
      prop="date"
      label="用户名">
      <template slot-scope="scope">
        <p>{{ scope.row.date }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="手机号">
      <template slot-scope="scope">
        <p>{{ scope.row.name }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="角色">
      <template slot-scope="scope">
        <p>{{ scope.row.name }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="创建时间">
      <template slot-scope="scope">
        <p>{{ scope.row.name }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="280"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="editData(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="removeData(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'memberList',
    props: {
      row: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return{
        dataList: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      // 编辑
      editData(index, row) {
        // this.$router.push({
        //   name: 'separateBill',
        //   params: {
        //     row: row
        //   }
        // })
      },
      // 删除
      removeData(index, row) {

      }
    },
    mounted () {

    }
  }
</script>

<style scoped>

</style>
