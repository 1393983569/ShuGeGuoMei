<template>
  <div>
    <breadcrumb :stateShow ='false'>
      <el-button type="primary" size="mini" @click="addCijiaHandle" v-if="bottonList.includes('操作')">新建</el-button>
      <el-button type="primary" size="mini" v-else disabled>新建</el-button>
    </breadcrumb>
    <div style="display:flex;flex-direction:row;">
      <!-- <el-button @click="allArea" style="margin:3px;hight:28px;">全部区域</el-button> -->
      <selector-address :province1id="provinceId" :city1id="cityId" :county1id="areaId" @getProvince="province" @getCity="city" @getCounty="county"/>
      <div style="position:absolute;right:1%;">
        <el-button @click="searchHandle" size="mini" type="primaryX" v-if="bottonList.includes('操作'||'查看')">筛选</el-button>
        <el-button @click="searchHandle" size="mini" type="primaryX" v-else>筛选</el-button>
        <el-button @click="clearHandle" size="mini" type="info" v-if="bottonList.includes('操作'||'查看')">清空</el-button>
        <el-button @click="clearHandle" size="mini" type="info" v-else>清空</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      :header-cell-style="{   }"
      center
      stripe>
      <el-table-column prop="name" label="名称"/>
      <el-table-column  prop="" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editCaijiaHandle(scope.row)" v-if="bottonList.includes('操作')">编辑</el-button>
          <el-button type="primary" size="mini" v-else disabled>编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteCaijiaHandle(scope.row)" v-if="bottonList.includes('操作')">删除</el-button>
          <el-button type="danger" size="mini" v-else disabled>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :page-sizes="[10, 15]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    <el-dialog
      :visible.sync="dialogVisible"
      width="550px"
      :title="caijiaTitle"
      >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="市场名称：" prop="name">
          <el-input v-model="ruleForm.name" style="width:40%;" placeholder="请输入名称"/>
        </el-form-item>
        <el-form-item label="市场类型：" prop="type">
          <el-select v-model="ruleForm.type" style="width:40%;">
            <el-option v-for="item in shichangList" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="区域选择：" prop="provinceId">
           <selector-address :province1id="ruleForm.provinceId" :city1id="ruleForm.cityId" :county1id="ruleForm.areaId" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty"/>
        </el-form-item>
        <el-form-item style="margin-right:10px;">
          <div style="width:90%;text-align: right;" v-if="eidtState=== '新建'">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </div>
          <div style="width:90%;text-align: right;" v-else-if="eidtState=== '编辑'">
            <el-button type="primary" @click="editSubmitForm('ruleForm')">保存</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <hint title="删除采价" v-model="showDelete" text="是否删除采价市场？" @confirm="deleteAdConfirm" />
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
import hint from '@/components/Hint'
// import caijiaAdd from './caijiaAdd.vue'
import Breadcrumb from '@/components/Breadcrumb'
import selectorAddress from '@/components/selectorAddress/selectorAddress.vue'
import {selectCaijia, addCaijia, editCaijia, deleteCaijia} from '@/api/category/caijia.js'
export default {
  data(){
    return{
      tableData:[],
      ruleForm:{
        name:'',
        type:'',
        cityId: '',
        provinceId: '',
        areaId: '',
      },
      rules: {
          name: [{ required: true, message: '请输采价市场名称', trigger: 'blur' }],
          type: [{ required: true, message: '请选择市场类型', trigger: 'blur' }],
          cityId: [{ required: true, message: '请选择省、市、区/县', trigger: 'blur' }],
          provinceId: [{ required: true, message: '请选择省、市、区/县', trigger: 'blur' }],
          areaId: [{ required: true, message: '请选择省、市、区/县', trigger: 'blur' }],
      },
      total: 0,
      pageSize: 10,
      pageNum: 1,
      cityId: '',
      provinceId: '',
      areaId: '',
      showDelete:false,
      type:'',
      closeState:false,
      dialogVisible:false,
      shichang:'',
      shichangList:[
        {
          id:0,
          name:'批发市场'
        },
        {
          id:1,
          name:'零售市场'
        },
        {
          id:2,
          name:'早市'
        },
      ],
      caijiaTitle:'',
      eidtState:'',
      id:'',
      bottonList:[],
    }
  },
  beforeRouteEnter (to, form, next) {
    next(mv => {
      mv.getButton(mv.$store.getters.buttonRoleList, to.name)
    })
  },
  components:{selectorAddress, Breadcrumb, hint},
  mounted(){
    this.getCaijiaList()
  },
  methods:{
    getButton(list, name) {
      list.forEach(item => {
        if (item.name === name) {
          this.bottonList = item.checkList
        }
      })
    },
    // addhandle(){},
    // 查询采价列表
    getCaijiaList(){
      let data = {}
      data.pageSize = this.pageSize
      data.pageNum = this.pageNum
      data.provinceId = this.provinceId
      data.cityId = this.cityId
      data.areaId = this.areaId
      selectCaijia(data).then(res=> {
        if(res.status === 1){
          this.total = res.info.totalrecord
          if(res.info.records.length>0){
            this.tableData= res.info.records
          }else{
            this.tableData=[]
            this.$message.info('暂无数据！')
          }
        }
      }).catch(err => {})
    },
    allArea(){},
    // 分页操作
    handleSizeChange(e) {
    this.pageSize = e
    },
    handleCurrentChange(e) {
      this.pageNum = e
    },
    // 获取省市区id
    getProvince(id) {
      this.ruleForm.provinceId = id
    },
    getCity(id) {
      this.ruleForm.cityId = id
    },
    getCounty(id) {
      this.ruleForm.areaId = id
    },

    // 获取筛选条件省市区id
    province(id) {
      this.provinceId = id
    },
    city(id) {
      this.cityId = id
    },
    county(id) {
      this.areaId = id
    },
    // 删除弹框
     deleteCaijiaHandle(row){
      this.showDelete = true
      this.id = row.id
    },
    // 确认删除
    deleteAdConfirm(){
      deleteCaijia(this.id).then(res => {
        if(res.status === 1){
          this.$message.success('删除成功!')
          this.showDelete = false
          this.getCaijiaList()
        }
      }).catch(err => {
        this.$message.error('删除失败！');

      })
    },
    // 编辑弹框
    editCaijiaHandle(row){
      this.eidtState ="编辑"
      this.ruleForm.id = row.id
      let obj = JSON.stringify(row)
      this.ruleForm = JSON.parse(obj)
      this.ruleForm.provinceId = row.provinceId.toString()
      this.ruleForm.cityId = row.cityId.toString()
      this.ruleForm.areaId = row.areaId.toString()
      this.ruleForm.type = row.type
      this.dialogVisible = true
      this.caijiaTitle = '编辑'
    },
    // 添加弹框
    addCijiaHandle(){
      this.eidtState ="新建"
      this.ruleForm = {}
      this.dialogVisible = true
      this.caijiaTitle = '新建'
    },
    // 确认编辑
    editSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editCaijia(this.ruleForm).then(res => {
            if(res.status === 1){
              this.$message.success('编辑成功！')
              this.dialogVisible = false
              this.getCaijiaList()
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('编辑失败！')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消必填验证
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
    },
    // 确认添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addCaijia(this.ruleForm).then(res => {
            if(res.status === 1){
              this.$message.success('添加成功！')
              this.dialogVisible = false
              this.getCaijiaList()
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('添加失败！')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 筛选
    searchHandle(){
      this.getCaijiaList()
    },
    // 清空筛选条件
    clearHandle(){
      this.provinceId = ''
      this.cityId = ''
      this.areaId = ''
      this.getCaijiaList()
    }
  }
}
</script>
<style>
.l{
  text-align: right;
}
</style>
