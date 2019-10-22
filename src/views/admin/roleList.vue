<template>
  <div>
    <Breadcrumb :stateShow="stateShow"></Breadcrumb>
    <el-table
      :data="tableData"
      :header-cell-style="{background:'#f0f2f3',   }"
      center
      stripe
    >
      <el-table-column
        label="角色名称">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click="viewDetails(scope.$index, scope.row)" v-if="bottonList.includes('操作'||'查看')">查看权限</el-button>
          <el-button v-else disabled size="mini" type="warning">查看权限</el-button>
          <el-button
            size="mini"
            type="primary"
            v-if="bottonList.includes('操作')&&scope.row.id!=='01'"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <p v-else-if="bottonList.includes('操作')&&scope.row.id==='01'"></p>
            <el-button size="mini" type="primary" v-else disabled>编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import virtualList from 'vue-virtual-scroll-list'
  import Breadcrumb from '@/components/Breadcrumb'
  import { selectAfter } from '@/api/admin/roleList'
  export default {
    name: 'roleList',
    components:{Breadcrumb},
    data () {
      return{
        stateShow:false,
        tableData: [],
        bottonList:[],
      }
    },
    beforeRouteEnter (to, form, next) {
      next(mv => {
        mv.getButton(mv.$store.getters.buttonRoleList, to.name)
      })
    },
    mounted() {
      this.stateShow = true
      this.getList()
    },
    methods: {
      getButton(list, name) {
      list.forEach(item => {
        if (item.name === name) {
          this.bottonList = item.checkList
        }
      })
    },
      getList() {
        this.tableData = []
        selectAfter().then(res => {
          this.tableData.push(...res.info)
        }).catch(err => {
          console.log(err)
        })
      },
      // 查看详情
      viewDetails(index, row) {
        this.$router.push({
          name: 'roleOperation',
          params: {
            row: row,
            state: 'select',
            id: row.id
          }
        })
      },
      // 修改
      handleEdit(index, row) {
        this.$router.push({
          name: 'roleOperation',
          params: {
            row: row,
            state: 'edit',
            id: row.id
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
