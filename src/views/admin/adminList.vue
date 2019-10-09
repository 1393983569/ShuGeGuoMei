<template>
  <div>
    <breadcrumb :stateShow ='false'>
      <el-button @click="addData" type="primary" v-if="bottonList.includes('操作')">新建</el-button>
      <el-button @click="addData" type="primary" v-else disabled>新建</el-button>
      <!-- <el-button type="">角色设置</el-button> -->
    </breadcrumb>
    <el-dialog
      title="编辑"
      :modal="true"
      :close-on-click-modal="false"
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
    <!-- 搜索条件 -->
    <div style="display:flex;direction-flex:row;">
      <span style="font-weight:bold;">角色：</span>
      <el-select v-model="charactar" style="width:20%;" size="mini" placeholder="请选择活动区域">
        <el-option v-for="item in roleList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <div>
        <div style="position:absolute; right:10px;">
        <!-- <el-button size="mini" type="primaryX" @click="search" :loading="loadingSearch">筛选</el-button>
        <el-button size="mini" type="info" @click="clearSearch" :loading="loadingClear">清空</el-button> -->
      </div>
      </div>
    </div>
    <div style="margin-top:5px;margin-bottom:20px;">
      <el-input
        placeholder="请输入用户名、手机号搜索"
        prefix-icon="el-icon-search"
        clearable
        v-model="param" style="width:400px;" size="mini">
      </el-input>
      <el-button size="mini" @click="inputSearch" type="primary">搜索</el-button>
    </div>
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
          <p v-if="scope.row.role.name">{{scope.row.role.name}}</p>
          <p v-else></p>
          <!-- <p>{{ scope.row.role.name }}</p> -->
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
            v-if="bottonList.includes('操作')"
          >编辑</el-button>
          <el-button size="mini" type="primary" v-else disabled>编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="removeData(scope.$index, scope.row)"
            v-if="bottonList.includes('操作')"
          >删除</el-button>
          <el-button size="mini" type="danger" v-else disabled>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:5px;">
      <el-pagination
        :page-sizes="[10, 15]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import hint from '@/components/Hint'
import Breadcrumb from '@/components/Breadcrumb'
import { addAdmin, selectPageAdmin, editAdmin } from '@/api/admin/adminList'
import { selectAfter } from '@/api/role'
import { constants } from 'fs';
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
      loading: false,
      bottonList:[],
      param:'',
      charactar:'',
      charactarList:[],
      total: 0,
      pagesize: 10,
      pageNum: 1,
    }
  },
  beforeRouteEnter (to, form, next) {
   console.log(to)
    next(mv => {
      mv.getButton(mv.$store.getters.buttonRoleList, to.name)
  	})
  },
  watch:{
    'param'(e){
      if(!e){
        this.params = e
        this.getAdminList()
      }else{
        // 去除参数前后的空格
        this.param = this.Trim(e)
        // this.getCaijiaUser()
      }
    }
  },
  mounted() {
    // 初始化
    this.getAdminList()
    this.getRoles()
  },
  methods: {
    Trim(str){
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    inputSearch(){
      this.getAdminList()
    },
    getButton(list, name) {
      list.forEach(item => {
        if (item.name === name) {
          this.bottonList = item.checkList
        }
      })
      // console.log(this.bottonList)
    },
    getAdminList() {
      this.dataList = []
      selectPageAdmin(this.pageNum, this.pagesize, this.param).then(res => {
        this.dataList = []
        this.total = res.info.totalrecord
        res.info.records.map(item => {
          // console.log(item.role)
          if(item.role){
            this.dataList.push(item)
          }else{
            item.role = {}
            this.dataList.push(item)
          }

        })
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
    handleSizeChange(e) {
      this.pageSize = e
    },
    handleCurrentChange(e) {
      this.pageNum = e
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
