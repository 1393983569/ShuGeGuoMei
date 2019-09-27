<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入用户名：" style="width:30%;"/>
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input v-model="ruleForm.mobile" placeholder="请输入手机号" style="width:30%;"/>
      </el-form-item>
      <el-form-item label="初始密码：" prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入账号初始密码" style="width:30%;"/>
      </el-form-item>
      <el-form-item label="市场类别：" prop="priceMarketType">
        <el-select v-model="ruleForm.priceMarketType" style="width:30%;">
          <el-option v-for="item in shichangTypeList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="市场区域：" prop="priceMarketId">
        <selector-address :province1id="provinceId" :city1id="cityId" :county1id="areaId" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty"/>
        <el-select v-model="ruleForm.priceMarketId" style="width:30%;" placeholder="请选择市场" size="mini" clearable>
          <el-option v-for="item in shichangList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <div v-if="userObject.state === '编辑'">
          <el-button type="primary" @click="editsubmitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </div>
        <div v-else>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import selectorAddress from '@/components/selectorAddress/selectorAddress.vue'
import { getCaijiaUser, addCaijiaUser, editCaijiaUser, deleteCaijiaUser, getPriceMarket} from '@/api/admin/caijiaUser.js'
export default {
  name:'caijiaUserAdd',
  components:{selectorAddress},
  data(){
    return{
      ruleForm:{
        priceMarketType:'',
        priceMarketId:'',
        mobile:'',
        password:'',
        name:'',
        cityId: '',
        provinceId: '',
        areaId: '',
        type:3,
        roleId:10,
      },
      cityId: '',
      provinceId: '',
      areaId: '',
      rules:{
         name: [{ required: true, message: '请输入采价用户名称', trigger: 'blur' }],
         priceMarketType: [{ required: true, message: '请选择市场种类', trigger: 'blur' }],
         priceMarketId: [{ required: true, message: '请选择市场', trigger: 'blur' }],
         mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
         password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
         cityId: [{ required: true, message: '请选择市', trigger: 'blur' }],
         provinceId: [{ required: true, message: '请选择省', trigger: 'blur' }],
         areaId: [{ required: true, message: '请选择区县', trigger: 'blur' }],
      },
      shichangTypeList:[
        {
          id:1,
          name:'批发市场'
        },
        {
          id:2,
          name:'零售市场'
        },
        {
          id:3,
          name:'早市'
        },
      ],
      shichangList:[],
      priceMarketId:'',
      userObject:{},
    }
  },
  mounted(){
    console.log(this.$route.params)
    if(JSON.stringify(this.$route.params)!=='{}'){
      this.userObject = this.$route.params
      this.ruleForm = this.$route.params
      this.provinceId = this.userObject.provinceId.toString()
      this.cityId = this.userObject.cityId.toString()
      this.areaId = this.userObject.areaId.toString()
    }
    this.getPriceMarket()
  },
  methods:{
    getProvince(id) {
      this.ruleForm.provinceId = id
    },
    getCity(id) {
      this.ruleForm.cityId = id
    },
    getCounty(id) {
      this.ruleForm.areaId = id
      this.getPriceMarket()
    },
    getPriceMarket(){
      let obj = {}
      obj.provinceId = this.ruleForm.provinceId
      obj.cityId = this.ruleForm.cityId
      obj.areaId = this.ruleForm.areaId
      getPriceMarket(obj).then(res => {
        if(res.status === 1){
          this.shichangList = res.info
        }
      }).catch(err=> {
        console.log(err)
        this.$message.error('查询市场失败！')
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm, 'kkkkkkkk')
          addCaijiaUser(this.ruleForm).then(res => {
            if(res.status === 1){
              this.$message.success('添加成功！')
              this.$router.back()
            }
          }).catch(err => {
            this.$message.error('添加失败！')
          })
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    editsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm, 'kkkkkkkk')
          let obj = {}
          obj.id = this.ruleForm.id
          obj.name = this.ruleForm.name
          obj.mobile = this.ruleForm.mobile
          obj.password = this.ruleForm.password
          obj.priceMarketType = this.ruleForm.priceMarketType
          obj.provinceId = this.ruleForm.provinceId
          obj.cityId = this.ruleForm.cityId
          obj.areaId = this.ruleForm.areaId
          obj.priceMarketId = this.ruleForm.priceMarketId
          obj.type = this.ruleForm.type
          obj.roleId = this.ruleForm.roleId
          editCaijiaUser(obj).then(res => {
            if(res.status === 1){
              this.$message.success('修改成功！')
              this.$router.back()
            }
          }).catch(err => {
            this.$message.error('修改失败！')
          })
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style>

</style>
