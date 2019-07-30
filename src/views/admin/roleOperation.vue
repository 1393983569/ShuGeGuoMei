<template>
  <div>
    <breadcrumb>
      <el-button v-if="showButton" type="primary" @click="getUserRole">确定</el-button>
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
  import { getAllMenu, addMenu, editMenu } from '@/api/admin/roleOperation'
  export default {
    name: 'roleOperation',
    components: {
      Breadcrumb
    },
    data () {
      return {
        tableData: [],
        showButton: false,
        userId: '',
        operationState: ''
      }
    },
    mounted() {

    },
    // 用来判断查看或者编辑
    beforeRouteEnter: (to, form, next) => {
      next((mv) => {
        console.log(to, form)
        mv.userId = mv.$route.params.id
        if (mv.$route.params.state === 'select') {
          mv.showButton = false
        } else {
          mv.showButton = true
        }
        mv.getUserListRole()
      })
    },
    methods: {
      getUserListRole() {
        // getAllMenu(this.userId).then(res => {
        getAllMenu(this.$store.state.user.roleId).then(res => {
          if (res.info === null) {
            this.tableData = this.recursionList(asyncRoutes)
            this.operationState = 'add'
          } else {
            console.log(JSON.parse(res.info.menu), '0000000')
            this.tableData = JSON.parse(res.info.menu)
            this.id = res.info.id
            this.operationState = 'edit'
          }
        }).catch(err => {
          console.log(err)
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
        if (this.operationState === 'add') {
          // 添加
          addMenu(this.tableData, this.userId).then(res => {
            this.$message.success('成功')
          }).catch(err => {
            this.$message.error(err)
          })
        } else if (this.operationState === 'edit') {
          // 编辑
          editMenu(this.tableData, this.id).then(res => {
            this.$message.success('成功')
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          this.$message.error('错误状态')
        }
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
          console.log(tmp.meta)
          tmp.roles = tmp.meta ? tmp.meta.roles : ''
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
          if (tmp.path !== '*' && !tmp.hidden) list.push(tmp)
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
              item.checkList = this.deleteList(item.checkList, '操作')
            }
            if (e.includes('操作')) {
              item.stateOperation = false
            } else {
              item.stateOperation = true
              item.checkList = this.deleteList(item.checkList, '查看')
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
