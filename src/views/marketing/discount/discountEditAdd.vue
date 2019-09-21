<template>
  <div>
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
        <pickGoods @getGoodFunction="getGoodFunction" :goodsArray="goodsArray"></pickGoods>
        <span class="hint">*S>2V参与计算，否则DR=100%</span>
        <discountTable :state="discountState" @getDiscountList="getDiscountList" :tableArray="tableArray" :detailState="detailstate"></discountTable>
      </el-form-item>
      <div v-if="addEdit==='编辑'">
        <el-button type="primary" @click="submitEditForm('discountForm')" :loading="editLoading">修改</el-button>
        <el-button @click="resetForm('discountForm')">取消</el-button>
      </div>
      <div v-else>
        <el-button type="primary" @click="submitForm('discountForm')" :loading="addLoading">保存</el-button>
        <el-button @click="resetForm('discountForm')">取消</el-button>
      </div>
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
// import timeCount from './timeCount.vue'
import discountTable from '../discountTable.vue'
import pickGoods from '@/views/pickGoods'
import { getAllShop } from '@/api/shop.js'
import { getSecondCategory } from '@/api/category/categoryList.js'
import { getGoods } from '@/api/collectShop.js'
import {addDiscount,editDiscount, discountDetail} from '@/api/marketing/discount.js'
import { setTimeout } from 'timers';
export default {
  components:{pickGoods, discountTable},
  name:"discountEditAdd",
  data(){
    return {
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
  mounted(){
    console.log(this.$route.params, 'canshu.....')
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
    // 必填项验证
    submitForm(formName) {
      this.discountState = true
      this.addLoading = true
      setTimeout(()=>{
        // 数据处理方法
        if(this.handleData()){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              addDiscount(this.discountForm).then(res => {
                if(res.status === 1){
                  this.$message.success('添加成功！')
                  this.addLoading = false
                  this.discountState = false
                  this.$router.go(-1)
                }
              }).catch(err=> {
                this.$message.success('添加失败！')
              })
            } else {
              return false
            }
          })
        }

      }, 200)
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
      console.log(this.discountTable, 'addBefore.....')
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
            obj.stock= []
            obj.stock.push(this.discountTable[i])
          }else if(this.discountTable[i].name==='日销量'){
            obj.salesVolume= []
            obj.salesVolume.push(this.discountTable[i])
          }else if(this.discountTable[i].name==='利润率'){
            obj.profitMargin= []
            obj.profitMargin.push(this.discountTable[i])
          }else if(this.discountTable[i].name==='利润值'){
            obj.profit= []
            obj.profit.push(this.discountTable[i])
          }else if(this.discountTable[i].name==='店铺会员数(取累计均值)'){
            obj.member= []
            obj.member.push(this.discountTable[i])
          }else if(this.discountTable[i].name==='会员人均购买力(取累计均值)'){
            obj.purchasing= []
            obj.purchasing.push(this.discountTable[i])
          }else if(this.discountTable[i].name==='月复购频次(取累计均值)'){
            obj.frequency= []
            obj.frequency.push(this.discountTable[i])
          }else if(this.discountTable[i].name==='会员购买力指数(万)'){
            obj.powerIndex= []
            obj.powerIndex.push(this.discountTable[i])
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
              console.log(res.info.goods[0].findPackage, 'kkkkkkkk')
              let disArr = []
              let object = res.info.goods[0].findPackage
              let stock = JSON.parse(object.stock)
              disArr.push(stock[0])
              let salesVolume = JSON.parse(object.salesVolume)
              disArr.push(salesVolume[0])
              let profitMargin = JSON.parse(object.profitMargin)
              disArr.push(profitMargin[0])
              let profit = JSON.parse(object.profit)
              disArr.push(profit[0])
              let member = JSON.parse(object.member)
              disArr.push(member[0])
              let purchasing = JSON.parse(object.purchasing)
              disArr.push(purchasing[0])
              let frequency = this.frequencyArr
              disArr.push(frequency[0])
              let powerIndex = JSON.parse(object.powerIndex)
              disArr.push(powerIndex[0])
              this.tableArray = disArr
            }
          }
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询折扣详情出错！')
      })
    },
    // 编辑必填项验证
    submitEditForm(formName) {
      this.editLoading = true
      console.log('edit,.,,,,,,,,')
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
