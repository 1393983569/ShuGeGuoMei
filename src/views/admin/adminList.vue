<template>
  <div>
    <breadcrumb :stateShow ='stateShow'>
      <el-button size="mini" @click="addData" type="primary" v-if="bottonList.includes('操作')">新建</el-button>
      <el-button size="mini" @click="addData" type="primary" v-else disabled>新建</el-button>
      <el-button size="mini" @click="roleSet" type="warning" v-if="bottonList.includes('操作')">角色设置</el-button>
      <el-button size="mini" type="warning" v-else disabled>角色设置</el-button>
    </breadcrumb>
     <!-- 搜索条件 -->
    <div style="display:flex;direction-flex:row;">
      <span style="font-weight:bold;">角色：</span>
      <el-select v-model="charactar" style="width:20%;" size="mini" placeholder="请选择活动区域" clearable>
        <el-option v-for="item in searchRoleList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <div>
        <div style="position:absolute; right:10px;">
        <el-button size="mini" type="primaryX" @click="search" :loading="loadingSearch">筛选</el-button>
        <el-button size="mini" type="info" @click="clearSearch" :loading="loadingClear">清空</el-button>
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
    <el-dialog
      :title="title"
      :modal="true"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名：" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input v-model="ruleForm.mobile" />
        </el-form-item>
        <el-form-item label="角色：" prop="roleId">
          <el-select v-model="ruleForm.roleId" placeholder="请选择角色" style="width: 100%" >
            <el-option :label="item.name" :value="item.id" :key="`role_${index}`" v-for="(item, index) in roleList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="初始密码：" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickCancel('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="addAdminClick('ruleForm')" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
    <hint v-model="hintState" :title="'删除'" :text="'是否删除该后台用户？'" @confirm="deleteUser" />

  </div>
</template>

<script>
import virtualList from 'vue-virtual-scroll-list'
import hint from '@/components/Hint'
import Breadcrumb from '@/components/Breadcrumb'
import { addAdmin, selectPageAdmin, editAdmin, deleteAdmin } from '@/api/admin/adminList'
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
    // 手机号验证
    var validateMobilePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不可为空'));
      } else {
        if (value !== '') {
          var reg=/^1[3456789]\d{9}$/;
          if(!reg.test(value)){
            callback(new Error('请输入有效的手机号码'));
          }
        }
        callback();
      }
    };
    return {
      loadingSearch:false,
      loadingClear:false,
      title:'',
      stateShow:false,
      dataList: [],
      ruleForm: {},
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        mobile: [
          { required: true, validator:validateMobilePhone, trigger: 'blur' },
        ],
        roleId: [
          { required: true, message: '请选择活动区域', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入初始密码', trigger: 'blur' },
        ],
      },
      dialogVisible: false,
      hintState: false,
      listIndex: '',
      listRow: {},
      roleList: [],
      searchRoleList:[],
      loading: false,
      bottonList:[],
      param:'',
      charactar:'',
      charactarList:[],
      total: 0,
      pagesize: 10,
      pageNum: 1,
      adminId:'',
    }
  },
  beforeRouteEnter (to, form, next) {
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
    },
    'charactar'(e){
      if(e){

      }else{
        this.charactar = ''
        this.getAdminList()
      }
    },
  },
  mounted() {
    // this.stateShow = true
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
    },
    getAdminList() {
      this.dataList = []
      selectPageAdmin(this.pageNum, this.pagesize, this.param, this.charactar).then(res => {
        this.dataList = []
        this.total = res.info.totalrecord
        res.info.records.map(item => {
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
    // 角色设置
    roleSet(){
      this.$router.push({
        name:'roleList'
      })
    },
    // 获取角色
    getRoles() {
      selectAfter().then(res => {
        this.searchRoleList[0] = {
          id:'',
          name:'全部'
        }
        res.info.map(item => {
          this.searchRoleList.push(item)
        })
        this.roleList.push(...res.info)
      }).catch(err => {
        console.log(err)
      })
    },
    // 编辑
    editData(index, row) {
      this.dialogVisible = true
      this.state = 'edit'
      this.title = '编辑用户'
      this.listIndex = index
      this.ruleForm = row
      this.ruleForm.roleId = row.role.id
    },
    // 添加
    addData() {
      this.ruleForm = {}
      this.dialogVisible = true
      this.state = 'add'
      this.title = '新建用户'
    },
    // 删除
    removeData(index, row) {
      this.listRow = row
      this.adminId = row.id
      this.hintState = true
    },
    // 删除用户
    deleteUser() {
      // this.dataList.splice(this.listIndex, 1)
      deleteAdmin(this.adminId).then(res => {
        if(res.status === 1){
          this.hintState = false
          this.$message.success('删除成功！')
          this.getAdminList()
        }
      }).catch(err => {
        console.log(err)
        this.hintState = false
        this.$message.error('删除成功！')
      })
      // 成功后隐藏

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
    addAdminClick (formName) {
      this.loading = true
      this.ruleForm.type=1
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新建
          if (this.state === 'add') {
            this.ruleForm.image = this.getUserAvatar(this.ruleForm.mobile)
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
        } else {
          return false;
        }
      });
    },
    // 默认头像设置
    getUserAvatar(phone){
      if(phone){
        let str = phone.substring(phone.length-2)
        let num = parseInt(str)
        if(num%2===0){
          return 'http://qiniu.freshergo.com/1571122700373.png'
        }else{
          return 'http://qiniu.freshergo.com/1571122731108.png'
        }
      }else{
        return 'http://qiniu.freshergo.com/1571122700373.png'
      }
    },
    handleSizeChange(e) {
      this.pageSize = e
      this.getAdminList()
    },
    handleCurrentChange(e) {
      this.pageNum = e
      this.getAdminList()
    },
    // 取消
    clickCancel(formName) {
      this.dialogVisible = false
      this.ruleForm = {}
      this.loading = false
      this.$refs[formName].resetFields();
      // 刷新table列表
      this.getAdminList()
    },
    clearSearch(){
      this.charactar = ''
      this.getAdminList()
    },
    search(){
      this.getAdminList()
    }
  }
}
</script>

<style scoped>

</style>
