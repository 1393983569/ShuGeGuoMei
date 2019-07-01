<template>
  <div>
    <breadcrumb>
      <el-button type="primary" @click="getUserRole">确定</el-button>
    </breadcrumb>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="name"
      border
      default-expand-all
      :tree-props="{children: 'children'}">
      <el-table-column
        prop="title"
        label="功能"
        sortable>
      </el-table-column>
      <el-table-column
        prop="role"
        label="权限"
        sortable>
        <template slot-scope="scope">
          <el-checkbox-group v-model="scope.row.checkList" @change="changeList($event, scope.row, scope.$index)">
            <el-checkbox label="查看" :disabled='scope.row.stateSelet'>查看</el-checkbox>
            <el-checkbox label="操作" :disabled='scope.row.stateOperation'>操作</el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import { asyncRoutes } from '@/router/index'
  import { getAllMenu } from '@/api/admin/roleOperation'
  export default {
    name: 'roleOperation',
    components: {
      Breadcrumb
    },
    data () {
      return {
        tableData: []
      }
    },
    mounted() {
      this.getUserListRole()
    },
    methods: {
      getUserListRole() {
        getAllMenu(1).then(res => {
          if (res.info.length === 0) {
            this.tableData = this.recursionList(asyncRoutes)
          } else {
            this.tableData = res.info
          }
        }).catch(err => {

        })
      },
      // 删除数组没有的值
      deleteList(list, value) {
        let err = list.map(item => {
          if (item === value) return item
        })
        return err
      },
      // 确定权限
      getUserRole() {
        console.log(this.tableData)
      },
      // 递归路由列表
      recursionList(data) {
        let list = []
        data.forEach((item, index) => {
          let tmp = { ...item }
          delete tmp.component
          delete tmp.alwaysShow
          delete tmp.redirect
          tmp.checkList = []
          tmp.title = tmp.meta ? tmp.meta.title : ''
          delete tmp.meta
          // 禁用父级下的子级
          if (tmp.children) {
            tmp.stateSelet = false
            tmp.stateOperation = false
          } else {
            tmp.stateSelet = true
            tmp.stateOperation = true
          }
          if (tmp.children) {
            tmp.children = this.recursionList(tmp.children)
          }
          if (tmp.path !== '*') list.push(tmp)
        })
        return list
      },
      changeList(e, row, index) {
        // this.tableData
        if (row.children) {
          row.children.forEach(item => {
            if (e.includes('查看')) {
              item.stateSelet = false
            } else {
              item.stateSelet = true
              item.checkList = this.deleteList(item.checkList, '查看')
            }
            if (e.includes('操作')) {
              item.stateOperation = false
            } else {
              item.stateOperation = true
              item.checkList = this.deleteList(item.checkList, '操作')
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
