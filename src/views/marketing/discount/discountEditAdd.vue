<template>
  <div>
    <Breadcrumb :stateShow="stateShowBread">
    <!-- 编辑 -->
      <div v-if="addEdit==='编辑'">
        <el-button size="mini" type="primary" @click="submitEditForm('discountForm')" :loading="editLoading">保存</el-button>
        <el-button size="mini" @click="resetForm('discountForm')" type="warning">取消</el-button>
      </div>
      <!-- 添加 -->
      <div v-else>
        <el-button size="mini" type="primary" @click="submitForm('discountForm')" :loading="addLoading">保存</el-button>
        <el-button size="mini" @click="resetForm('discountForm')" type="warning">取消</el-button>
      </div>
    </Breadcrumb>
    <el-form ref="discountForm" :model="discountForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="折扣包名称：" prop="name">
        <el-input v-model="discountForm.name" style="width:300px;" placeholder="请输入折扣包名称"></el-input><span style="color:red;">*</span>
      </el-form-item>
      <el-form-item label="选择店铺：" prop="shopId">
        <el-select v-model="discountForm.shopId" placeholder="请选择">
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select><span style="color:red;">*</span>
      </el-form-item>
      <el-form-item label="选择商品：" prop="name"><span style="color:red;">*</span>
        <pickGoods @getGoodFunction="getGoodFunction" :goodsArray="goodsArray" :shopId="getShopId"></pickGoods>
        <span class="hint">*S>2V参与计算，否则DR=100%</span>
        <discountTable :state="discountState" @getDiscountList="getDiscountList" :tableArray="tableArray" :detailState="detailstate"></discountTable>
      </el-form-item>

      </el-form-item>
    </el-form>
    <el-dialog
      title="提示"
      modal
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :visible.sync="outerHundred"
      width="30%"
      center>
      <span>W列数据填写有误，请确认无误后保存！</span>
    </el-dialog>
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
// import timeCount from './timeCount.vue'
import Breadcrumb from '@/components/Breadcrumb'
import discountTable from '../discountTable.vue'
import pickGoods from '@/views/pickGoods'
import { getAllShop } from '@/api/shop.js'
import { getSecondCategory } from '@/api/category/categoryList.js'
import { getGoods } from '@/api/collectShop.js'
import {addDiscount,editDiscount, discountDetail} from '@/api/marketing/discount.js'
import { setTimeout } from 'timers';
export default {
  components:{pickGoods, discountTable, Breadcrumb},
  name:"discountEditAdd",
  data(){
    return {
      // 查询品类的店铺id
      getShopId:'',
      stateShowBread:false,
      // 加载圈
      addLoading:false,
      editLoading:false,
      // w数据超出100的提示
      outerHundred:false,
      frequencyArr:[{
          index:'7',
          name:'月复购频次(取累计均值)',
          num:'FM',
          c:'',
          tp:'',
          t:'',
          w:'',
          range:'',
          r:'',
          ra:'',
          wv:'',
          rangNum:0,
        },],
      endTime:'',
      goodsArray:[],
      tableArray:[],
      detailstate:false,
      discountPackageId:'',
      discountForm:{
        name:'',
        shopId:'',
      },
      rules:{
        name:[{ required: true, message: '请输入折扣包名称', trigger: 'blur' }],
        shopId:[{ required: true, message: '请选择店铺', trigger: 'blur' }],
      },
      shopList:[],
      shopId:'',
      name:'',
      rules:{},
      dataTree:[],
      checkGoodsList:[],
      categoryOneId: '',
      categoryTwoId: '',
      goodsList:[],
      toggleSelectionList:[],
      discountState:false,
      discountTable:[],
      profitMargin:0,
      addEdit:'',
      wNum:0,
    }
  },
  watch:{
    'discountForm.shopId'(e){
      this.getShopId = e
    }
  },
  mounted(){
    this.stateShowBread = false
    if(JSON.stringify(this.$route.params)!== '{}'){
      if(this.$route.params.addEdit ==='编辑'){
        this.addEdit = this.$route.params.addEdit
        this.id = this.$route.params.id
        this.detailstate = true
        this.getDiscountDetail()
      }else if(this.$route.params.addEdit ==='添加'){
        this.detailstate = true
      }
    }else if(JSON.stringify(this.$store.state.user.discountObject)!=='{}'){
      this.addEdit = this.$route.params
      this.id = this.$store.state.user.discountObject.id
      this.getDiscountDetail()
    }else{}
    this.getAllShopList()
  },
  methods:{
    // 查询所有店铺
    getAllShopList() {
      getAllShop().then(res => {
        this.shopList = res.info
      }).catch(err => {
        console.log(err)
        this.$message.error('查询店铺出错')
      })
    },
    // 添加必填项验证
    submitForm(formName) {
      this.discountState = true
      this.addLoading = true
      setTimeout(()=>{
        // 数据处理方法
        if(this.handleData()){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // 判断商品是否为空
              if(this.discountForm.discountPackageGoods){

              }else{
                this.$message.warning('请选择折扣商品')
                this.addLoading = false
                return
              }
              console.log(this.discountForm, 'table...')
              addDiscount(this.discountForm).then(res => {
                if(res.status === 1){
                  this.$message.success('添加成功！')
                  this.addLoading = false
                  this.discountState = false
                  this.$router.go(-1)
                }
              }).catch(err=> {
                this.$message.success('添加失败！')
                this.addLoading = false
              })
            } else {
              return false
            }
          })
        }

      }, 200)
    },
    // 折扣表的计算
    switch5(tp){
      switch(true){
        case tp<20:
          return 70;break;
        case tp>=20&&tp<50:
          return 80;break;
        case tp>=50&&tp<70:
          return 85;break;
        case tp>=70&&tp<90:
          return 90;break;
        case tp>=90&&tp<=100:
          return 95;break;
      }
    },
    switch6(tp){
      switch(true){
        case tp<100:
          return 100;break;
        case tp<120&&tp>=100:
          return 97;break;
        case tp<150&&tp>=120:
          return 95;break;
        case tp<180&&tp>=150:
          return 92;break;
        case tp<200&&tp>=180:
          return 90;break;
        case tp<=300&&tp>=200:
          return 85;break;
      }
    },
    // 数据处理
    handleData(){
      // 折扣商品
      let goodsIdList = []
      this.goodsList.map(item => {
        goodsIdList.push(item.goodsId)
      })
      this.discountForm.discountPackageGoods = goodsIdList.toString()
      // 折扣表参数处理
      let obj = {}
      this.wNum = 0
      for(let i = 1; i<this.discountTable.length; i++){
          if(this.discountTable[i].tp){
            this.discountTable[i].tp = Number(this.discountTable[i].tp)
          }else{
            this.discountTable[i].tp = ''
          }
          if(this.discountTable[i].w){
            this.discountTable[i].w = Number(this.discountTable[i].w)
          }else{

          }
          // w不能超过100，超过100数据有误
          if(this.discountTable[i].w){
            this.wNum += this.discountTable[i].w
          }else{

          }
        if(this.discountTable[i].name==='库存'){
            obj.stock= this.countModal(this.discountTable[i], '5')
          }else if(this.discountTable[i].name==='日销量'){
            obj.salesVolume= this.countModal(this.discountTable[i], '6')
          }else if(this.discountTable[i].name==='利润率'){
            obj.profitMargin=this.countModal(this.discountTable[i], '6')
          }else if(this.discountTable[i].name==='利润值'){
            obj.profit= this.countModal(this.discountTable[i], '6')
          }else if(this.discountTable[i].name==='店铺会员数(取累计均值)'){
            obj.member= this.discountTable[i]
          }else if(this.discountTable[i].name==='会员人均购买力(取累计均值)'){
            obj.purchasing= this.discountTable[i]
          }else if(this.discountTable[i].name==='月复购频次(取累计均值)'){
            obj.frequency= this.discountTable[i]
          }else if(this.discountTable[i].name==='会员购买力指数(万)'){
            obj.powerIndex= this.discountTable[i]
          }
        }
        if(this.wNum===100){
          this.discountForm.obj = obj
          return true
        }else{
          this.open()
          return false
        }

    },
    // 折扣表计算公式
    countModal(obj, num){
      if(num === '5'){
        obj.ra = this.switch5(obj.tp)
        obj.wv =obj.ra*obj.w
        return obj
      }else{
        obj.ra = this.switch6(obj.tp)
        obj.wv =obj.ra*obj.w
        return obj
      }
    },
    open() {
     this.outerHundred = true
     let _this = this
     setTimeout(function(){
       _this.outerHundred = false
       _this.editLoading = false
       _this.addLoading = false
     },3000)
    },
    // 查询折扣详情
    getDiscountDetail(){
      discountDetail(this.id).then(res => {
        if(res.status === 1){
          this.discountForm.name = res.info.name
          this.discountForm.shopId = res.info.shopId
          this.discountPackageId = res.info.goods[0].findPackage.id
          // 商品回显
          if(res.info.goods.length>0){
            let arr =[]
            res.info.goods.forEach(item => {
              let goods = {}
              goods.categoryOneId = item.categoryOneId
              goods.categoryOneName = item.categoryOneName
              goods.categoryTwoId = item.categoryTwoId
              goods.categoryTwoName = item.categoryTwoName
              goods.goodsId = item.goodsId
              goods.goodsName = item.goodsName
              goods.standards = item.standards
              goods.unit = item.unit
              arr.push(goods)
            })
            this.goodsArray = arr
            // 折扣包回显数据
            if(res.info.goods[0].findPackage){
              let disArr = []
              let object = res.info.goods[0].findPackage
              let stock =this.clearRaWv(JSON.parse(object.stock))
              disArr.push(stock)
              let salesVolume =this.clearRaWv(JSON.parse(object.salesVolume))
              disArr.push(salesVolume)
              let profitMargin =this.clearRaWv(JSON.parse(object.profitMargin))
              disArr.push(profitMargin)
              let profit =this.clearRaWv(JSON.parse(object.profit))
              disArr.push(profit)
              let member =this.clearRaWv(JSON.parse(object.member))
              disArr.push(member)
              let purchasing =this.clearRaWv(JSON.parse(object.purchasing))
              disArr.push(purchasing)
              let frequency =this.clearRaWv(JSON.parse(object.frequency))
              disArr.push(frequency)
              let powerIndex =this.clearRaWv(JSON.parse(object.powerIndex))
              disArr.push(powerIndex)
              this.tableArray = disArr
            }
          }
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询折扣详情出错！')
      })
    },
    // 编辑是将每项的ra和wv放空
    clearRaWv(item){
      item.ra = ''
      item.wv= ''
      return item
    },
    // 编辑必填项验证
    submitEditForm(formName) {
      this.editLoading = true
      this.discountState = true
      this.discountForm.id = this.id
      this.discountForm.discountPackageId = this.discountPackageId
      setTimeout(()=>{
        if(this.handleData()){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              editDiscount(this.discountForm).then(res => {
                if(res.status === 1){
                  this.$message.success('编辑成功！')
                  this.editLoading = false
                  this.$router.go(-1)
                }
              }).catch(err=> {
                this.$message.success('编辑失败！')
              })
            } else {
              return false
            }
          })
        }else{}
      }, 200)
    },
    getDiscountList(e){
      this.discountTable= e

    },
    // 重置必填项
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$router.back()
    },
    getGoodFunction(list){
      this.goodsList = list
    }
  }
}
</script>
<style>
.categoryHeader{
    width: 260px;
    height:55px;
    background-color: #f0f2f3;
    text-align: center;
    line-height: 60px;
    color:#909399;
    font-weight: 700;
  }
  .goodsContainer{
    display:flex;
    flex-direction: row;
    width:90%;
  }
  .categoryBody{
    width:260px;
    height:445px;
    border:1px solid #f0f2f3;
    background-color:#FFFFFF;
  }
  el-tree{
    height:445px;
    border:1px solid #f0f2f3;
  }
  .hint{
    color: rgba(102, 102, 102, 1);
    font-size: 14px;
    font-family: SourceHanSansSC-regular;
  }
</style>
