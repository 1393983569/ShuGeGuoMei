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
        <pickGoods @getGoodFunction="getGoodFunction"></pickGoods>
        <span class="hint">*S>2V参与计算，否则DR=100%</span>
        <discountTable :state="discountState" @getDiscountList="getDiscountList"></discountTable>
      </el-form-item>
      <div v-if="addEdit==='编辑'">
        <el-button type="primary" @click="submitEditForm('discountForm')">修改</el-button>
        <el-button @click="resetForm('discountForm')">取消</el-button>
      </div>
      <div v-else>
        <el-button type="primary" @click="submitForm('discountForm')">保存</el-button>
        <el-button @click="resetForm('discountForm')">取消</el-button>
      </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
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
      addEdit:''
    }
  },
  mounted(){
    console.log(this.$route.params, 'canshu.....')
    if(JSON.stringify(this.$route.params)!== '{}'){
      this.addEdit = this.$route.params.addEdit
      this.id = this.$route.params.id
      this.getDiscountDetail()
    }
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
      setTimeout(()=>{
        this.handleData()
        // console.log(this.discountTable, 'adddd......')
        // return
        this.$refs[formName].validate((valid) => {
        if (valid) {
          addDiscount(this.discountForm).then(res => {
            if(res.status === 1){
              this.$message.success('添加成功！')
              this.$router.go(-1)
            }
          }).catch(err=> {
            this.$message.success('添加失败！')
          })
        } else {
          return false
        }
      })
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
      for(let i = 1; i<this.discountTable.length; i++){
        if(this.discountTable[i].tp&&this.discountTable[i].tp){
          this.discountTable[i].tp = Number(this.discountTable[i].tp)
          this.discountTable[i].w = Number(this.discountTable[i].w)
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
          }else if(this.discountTable[i].name==='月复够频次(取累计均值)'){
            obj.frequency= []
            obj.frequency.push(this.discountTable[i])
          }else if(this.discountTable[i].name==='会员购买力指数(万)'){
            obj.powerIndex= []
            obj.powerIndex.push(this.discountTable[i])
          }
        }
        this.discountForm.obj = obj
    },
    getDiscountDetail(){
      discountDetail(this.id).then(res => {
        if(res.status === 1){
          // console.log(res, 'res.....detail.....')
        }
      }).catch(err => {

      })
    },
    // 编辑必填项验证
    submitEditForm(formName) {
      this.discountState = true
      // 折扣商品
      let goodsIdList = []
      this.goodsList.map(item => {
        goodsIdList.push(item.goodsId)
      })
      this.discountForm.discountPackageGoods = goodsIdList.toString()
      // 折扣表参数处理
      // let obj = {}
      // for(let i = 1; i<this.discountTable.length; i++){
      //   if(this.discountTable[i].tp&&this.discountTable[i].tp){
      //     this.discountTable[i].tp = Number(this.discountTable[i].tp)
      //     this.discountTable[i].w = Number(this.discountTable[i].w)
      //   }
      //   if(this.discountTable[i].name==='库存'){
      //       obj.stock= []
      //       obj.stock.push(this.discountTable[i])
      //     }else if(this.discountTable[i].name==='日销量'){
      //       obj.salesVolume= []
      //       obj.salesVolume.push(this.discountTable[i])
      //     }else if(this.discountTable[i].name==='利润率'){
      //       obj.profitMargin= []
      //       obj.profitMargin.push(this.discountTable[i])
      //     }else if(this.discountTable[i].name==='利润值'){
      //       obj.profit= []
      //       obj.profit.push(this.discountTable[i])
      //     }else if(this.discountTable[i].name==='店铺会员数(取累计均值)'){
      //       obj.member= []
      //       obj.member.push(this.discountTable[i])
      //     }else if(this.discountTable[i].name==='会员人均购买力(取累计均值)'){
      //       obj.purchasing= []
      //       obj.purchasing.push(this.discountTable[i])
      //     }else if(this.discountTable[i].name==='月复够频次(取累计均值)'){
      //       obj.frequency= []
      //       obj.frequency.push(this.discountTable[i])
      //     }else if(this.discountTable[i].name==='会员购买力指数(万)'){
      //       obj.powerIndex= []
      //       obj.powerIndex.push(this.discountTable[i])
      //     }
      //   }
      //   this.discountForm.obj = obj
        this.discountForm.id = this.id
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addDiscount(this.discountForm).then(res => {
            if(res.status === 1){
              this.$message.success('添加成功！')
            }
          }).catch(err=> {
            this.$message.success('添加失败！')
          })
        } else {
          return false
        }
      })
    },
    getDiscountPackage(item){
      let stock= []
      stock.push(item)
      return stock
    },
    getDiscountList(e){
      console.log(e, 'eeeeeeeee')
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
