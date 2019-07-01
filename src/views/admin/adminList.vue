<template>
  <div>
    <breadcrumb>
      <el-button @click="addData">新建</el-button>
      <el-button>角色设置</el-button>
    </breadcrumb>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="90px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input v-model="ruleForm.mobile" />
        </el-form-item>
        <el-form-item label="角色：" prop="roleId">
          <el-select v-model="ruleForm.roleId" placeholder="请选择活动区域" style="width: 100%" >
            <el-option :label="item.name" :value="item.id" :key="`role_${index}`" v-for="(item, index) in roleList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="初始密码：" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickCancel">取 消</el-button>
        <el-button type="primary" @click="addAdminClick" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
    <hint v-model="hintState" :title="'删除'" :text="'是否删除该后台用户？'" @confirm="deleteUser" />
    <el-table
      :data="dataList"
      center
      stripe
    >
      <el-table-column
        prop="date"
        label="用户名"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="手机号"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.mobile }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="创建时间"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.createTime }}</p>
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
            @click="editData(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="removeData(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import hint from '@/components/Hint'
import Breadcrumb from '@/components/Breadcrumb'
import { addAdmin, selectPageAdmin, editAdmin } from '@/api/admin/adminList'
import { selectAfter } from '@/api/role'
export default {
  name: 'AdminList',
  components: {
    hint,
    Breadcrumb
  },
  props: {
    row: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dataList: [],
      ruleForm: {},
      rules: {},
      dialogVisible: false,
      hintState: false,
      listIndex: '',
      listRow: {},
      roleList: [],
      loading: false
    }
  },
  mounted() {
    // 初始化
    this.getAdminList()
    this.getRoles()
  },
  methods: {
    getAdminList() {
      this.dataList = []
      selectPageAdmin(1).then(res => {
        this.dataList.push(...res.info.records)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取角色
    getRoles() {
      selectAfter().then(res => {
        this.roleList.push(...res.info)
      }).catch(err => {
        console.log(err)
      })
    },
    // 编辑
    editData(index, row) {
      this.dialogVisible = true
      this.state = 'edit'
      this.listIndex = index
      this.ruleForm = row
      this.ruleForm.roleId = row.role.id
    },
    // 添加
    addData() {
      this.ruleForm = {}
      this.dialogVisible = true
      this.state = 'add'
    },
    // 删除
    removeData(index, row) {
      this.listRow = row
      this.hintState = true
    },
    // 删除用户
    deleteUser() {
      this.dataList.splice(this.listIndex, 1)
      // 成功后隐藏
      this.hintState = false
    },
    // 添加成功
    addSuccess() {
      this.$message.success('成功')
      this.dialogVisible = false
      this.ruleForm = {}
      this.loading = false
      this.getAdminList()
    },
    // 添加用户
    addAdminClick () {
      this.loading = true
      // 新建
      if (this.state === 'add') {
        addAdmin(this.ruleForm).then(res => {
          this.addSuccess()
        }).catch(err => {
          this.loading = false
          this.$message.success(err)
        })
      } else {
        delete this.ruleForm.role
        editAdmin(this.ruleForm).then(res => {
          this.addSuccess()
        }).catch(err => {
          this.loading = false
          this.$message.success(err)
        })
      }
    },
    // 取消
    clickCancel() {
      this.dialogVisible = false
      this.ruleForm = {}
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
