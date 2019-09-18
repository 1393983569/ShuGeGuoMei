<template>
  <div>
    <breadcrumb>
     <el-button size="mini" type="down"  v-if="status === 1" @click="discountStop">停用</el-button>
     <el-button size="mini" type="up" v-if="status === 0" @click="discountStop">启用</el-button>
     <el-button size="mini" type="primary" @click="editHandle">编辑</el-button>
    </breadcrumb>
    <div>
      <el-form>
        <el-form-item label="折扣包名称：">
          {{name}}
        </el-form-item>
        <el-form-item label="选择店铺：">
          {{shopName}}
        </el-form-item>
        <el-form-item label="选择商品：">
          <el-button class="button" v-for="item in categoryOneList" :key="item.id" :value="item.id" @click="getGoodsHandle(item)">{{item.name}}</el-button>
          <div style="margin-left:80px;margin-top:10px;" v-if="showGoodsState"><el-button v-if="firstObj.goodsName" @click="getDiscountHnadle(firstObj)" class="button">{{firstObj.goodsName}}</el-button>&nbsp;&nbsp;<span v-if="firstObj.goodsName" class="span-color" @click="moreHandle">更多>></span></div>
          <div v-else class="goods">
            <div><el-button class="button">{{buttonList[0].goodsName}}</el-button>&nbsp;&nbsp;<span class="span-color" @click="retractHandle">收起</span></div>
            <hr style="border:0.5px solid #BBBBBB;"/>
            <div>
              <el-button class="button" v-for="item in buttonList" :key="item.goods_id" :value="item.goods_id" @click="getDiscountHnadle(item)">{{item.goodsName}}</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="状态：">

        </el-form-item>
        <el-form-item label="">
          <discountTable :tableArray="tableArray"></discountTable>
        </el-form-item>
      </el-form>
    </div>
    <hint :title="title" v-model="showUpdate" :text="text" @confirm="updateConfirm" />
  </div>
</template>
<script>
import discountTable from '../discountTable.vue'
import hint from '@/components/Hint'
import {discountDetail, getDiscountGoods, editStatus} from '@/api/marketing/discount.js'
import breadcrumb from '@/components/Breadcrumb'
export default {
  components:{
    breadcrumb,hint, discountTable
  },
  data(){
    return{
      showGoodsState:true,
      name:'',
      shopName: '',
      categoryOneList:[],
      buttonList:[],
      firstObj:{},
      text:'',
      title:'',
      showUpdate:false,
      status:0,
      state:0,
      tableArray:[]
    }
  },
  mounted(){
    if(JSON.stringify(this.$route.params)!== '{}'){
      // this.addEdit = this.$route.params.addEdit
      this.status = this.$route.params.status
      this.id = this.$route.params.id
      this.getDiscountDetail()
    }else{
      this.status = this.$store.state.user.discountObject.status
      this.id = this.$store.state.user.discountObject.id
      this.getDiscountDetail()
    }
  },
  methods:{
    moreHandle(){
      this.showGoodsState = false
    },
    retractHandle(){
      this.showGoodsState = true
    },
    // getDiscountDetail(){
    //   discountDetail(this.id).then(res => {
    //     this.name = res.info.name
    //     this.shopName = res.info.shopName
    //     this.categoryOneList=[]
    //     let idArr = []
    //     let objArr = []
    //     res.info.goods.map(item =>{
    //       let tempObj = {}
    //       tempObj.id = item.categoryOneId
    //       tempObj.name = item.categoryOneName
    //       objArr.push(tempObj)
    //       idArr.push(item.categoryOneId)
    //     })
    //     let uniqueArr = this.unique(idArr)
    //     this.getCategoryHandle(uniqueArr,objArr)
    //   }).catch(err => {})
    // },
     // 查询折扣详情
    getDiscountDetail(){
      discountDetail(this.id).then(res => {
        if(res.status === 1){
          this.name = res.info.name
          this.shopName = res.info.shopName
          this.categoryOneList=[]
          // 商品回显
          if(res.info.goods.length>0){
            let idArr = []
            let objArr = []
            res.info.goods.map(item =>{
              let tempObj = {}
              tempObj.id = item.categoryOneId
              tempObj.name = item.categoryOneName
              objArr.push(tempObj)
              idArr.push(item.categoryOneId)
            })
            let uniqueArr = this.unique(idArr)
            this.getCategoryHandle(uniqueArr,objArr)
            // 折扣包回显数据
            if(res.info.goods[0].findPackage){
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
              let frequency = JSON.parse(object.frequency)
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
    // 去重处理
    unique(arr) {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i])===-1) {
                newArr.push(arr[i])
            }
        }
        return newArr
    },
    // 一级品类按钮处理
    getCategoryHandle(idList, objList){
      this.categoryOneList = []
      for(let i=0; i<idList.length; i++){
        for(let j=0; j<objList.length; j++){
          if(idList[i]===objList[j].id){
            this.categoryOneList.push(objList[j])
            break
          }else{

          }
        }
      }
      this.getGoodsHandle(this.categoryOneList[0])
    },
    // 查商品
    getGoodsHandle(cateOne){
      getDiscountGoods(cateOne.id,this.id).then(res => {
        if(res.info.length>0){
          this.buttonList=res.info
          this.firstObj = this.buttonList[0]

        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询折扣下的商品失败！')
      })
    },
    // 根据商品查折扣包
    getDiscountHnadle(e){
      console.log(e, 'biao////////')
    },
    editHandle(){
      this.$router.push({name:'discountEditAdd'})
    },
    // 停用启用
    discountStop(){
      if(this.status === 0){
        this.state = 1
        this.showUpdate = true
        this.title = '启用折扣包'
        this.text = '是否启用该折扣包？'
      }else if(this.status ===1){
        this.state = 0
        this.showUpdate = true
        this.title = '停用折扣包'
        this.text = '是否停用该折扣包？'
      }
    },
    // 确认启用、停用折扣包
    updateConfirm(){
      editStatus(this.id, this.state).then(res=>{
        if(res.status === 1){
          this.$message.success(this.title+'成功！')
          this.showUpdate = false
          this.status = this.state
        }
      }).catch(err => {
        this.$message.error(this.title+'失败！')
        this.showUpdate = false
      })
    }
  }
}
</script>
<style>
.span-color{
  color: #418CFF;
  cursor: pointer;
}
.span-color:hover{
  color: rgb(29, 81, 155);
}
.goods{
  width:80%;
  height: 400px;
  background-color: #FFFFFF;
  margin-left:80px;
  margin-top:10px;
  padding:10px;
}
.button:hover{
  background-color: #999999;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
}
.button:focus{
  background-color: #999999;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
}
</style>
