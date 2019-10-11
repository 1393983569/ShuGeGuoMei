<template>
  <div>
    <Breadcrumb :stateShow="stateShow">
      <div v-if="userObject.state === '编辑'">
        <el-button size="mini" type="primary" @click="editsubmitForm('ruleForm')">保存</el-button>
        <el-button size="mini" type="warning" @click="resetForm('ruleForm')">取消</el-button>
      </div>
      <div v-else>
        <el-button size="mini" type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button size="mini" type="warning" @click="resetForm('ruleForm')">取消</el-button>
      </div>
    </Breadcrumb>
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
        <el-select @change="changeType" v-model="ruleForm.priceMarketType" style="width:30%;">
          <el-option v-for="item in shichangTypeList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="市场区域：" prop="areaId">
        <selector-address :province1id="provinceId" :city1id="cityId" :county1id="areaId" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty"/>
        <el-select @focus="selectFocus" v-model="priceMarketIdList" multiple  style="width:30%;" placeholder="请选择市场" size="mini">
          <el-option v-for="item in shichangList" :key="item.id" :value="`${item.id}/${item.name}`" :label="item.name" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb'
import selectorAddress from '@/components/selectorAddress/selectorAddress.vue'
import { getCaijiaUser, addCaijiaUser, editCaijiaUser, deleteCaijiaUser, getPriceMarket} from '@/api/admin/caijiaUser.js'
export default {
  name:'caijiaUserAdd',
  components:{selectorAddress,Breadcrumb},
  data(){
    // 手机号码验证
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    };
    return{
      stateShow:false,
      ruleForm:{
        priceMarketType:'',
        mobile:'',
        password:'',
        name:'',
        cityId: '',
        provinceId: '',
        areaId: '',
        type:3,
        roleId:10,
        priceMarketManDomain:[],
      },
      priceMarketIdList:[],
      cityId: '',
      provinceId: '',
      areaId: '',
      rules:{
         name: [{ required: true, message: '请输入采价用户名称', trigger: 'blur' }],
         priceMarketType: [{ required: true, message: '请选择市场种类', trigger: 'blur' }],
         areaId: [{ required: true, message: '请选择市场', trigger: 'blur' }],
         mobile: [{ required: true,validator:checkPhone, trigger: 'blur' }],
        //  mobile: [{ required: true,trigger: 'blur' }],
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
      priceMarketIdList:[],
      userObject:{},
    }
  },
  watch:{
    'priceMarketIdList'(e){
      if(e){
        let arr = []
        e.forEach(el => {
          let obj = {}
          obj.priceMarketId = parseInt(el.split('/')[0])
          obj.priceMarketName = el.split('/')[1]
          obj.priceMarketType = this.ruleForm.priceMarketType
          arr.push(obj)
        });
        this.ruleForm.priceMarketManDomain = JSON.stringify(arr)
      }
    },
  },
  mounted(){
    // this.stateShow = true
    if(JSON.stringify(this.$route.params)!=='{}'){
      this.userObject = this.$route.params
      this.ruleForm = this.$route.params
      // 市场区域回显
      this.priceMarketIdList= []
      this.ruleForm.priceMarketMan.forEach(item => {
        let str = `${item.priceMarketId}/${item.priceMarketName}`
        this.priceMarketIdList.push(str)
      })
      // 省市区回显
      this.provinceId = this.userObject.provinceId.toString()
      this.cityId = this.userObject.cityId.toString()
      this.areaId = this.userObject.areaId.toString()
    }
    // this.getPriceMarket()
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

    },
    changeType(){
      this.priceMarketIdList = []
    },
    selectFocus(){
      if(!this.ruleForm.provinceId){
        this.$message.warning('请选择省！')
        return
      }
      if(!this.ruleForm.cityId){
        this.$message.warning('请选择市！')
        return
      }
      if(!this.ruleForm.areaId){
        this.$message.warning('请选择区！')
        return
      }
      if(!this.ruleForm.priceMarketType){
        this.$message.warning('请选择市场类别！')
        return
      }
      this.getPriceMarket()
    },
    getPriceMarket(){
      let obj = {}
      obj.provinceId = this.ruleForm.provinceId
      obj.cityId = this.ruleForm.cityId
      obj.areaId = this.ruleForm.areaId
      obj.type = this.ruleForm.priceMarketType
      getPriceMarket(obj).then(res => {
        if(res.status === 1){
          // console.log(res.info, 'kkkkkkkk')
          this.shichangList = res.info
        }
      }).catch(err=> {
        console.log(err)
        this.$message.error('查询市场失败！')
      })
    },
    submitForm(formName) {
      console.log('caijia1111......')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //需要处理市场区域
          console.log('caijia......')
          addCaijiaUser(this.ruleForm).then(res => {
            if(res.status === 1){
              this.$message.success('添加成功！')
              this.$router.back()
            }
          }).catch(err => {
            this.$message.error('添加失败！')
          })
        } else {
          console.log('cuwu!!!')
          return false;
        }
      });
    },
    editsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {}
          obj.id = this.ruleForm.id
          obj.name = this.ruleForm.name
          obj.mobile = this.ruleForm.mobile
          obj.password = this.ruleForm.password
          obj.priceMarketType = this.ruleForm.priceMarketType
          obj.provinceId = this.ruleForm.provinceId
          obj.cityId = this.ruleForm.cityId
          obj.areaId = this.ruleForm.areaId
          // obj.priceMarketId = this.ruleForm.priceMarketId
          obj.type = this.ruleForm.type
          obj.roleId = this.ruleForm.roleId
          obj.priceMarketManDomain = this.ruleForm.priceMarketManDomain
          //需要处理市场区域
          // return
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
      this.$router.back()
    }
  }
}
</script>
<style>

</style>
