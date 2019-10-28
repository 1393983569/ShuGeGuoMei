<template>
  <div>
    <breadcrumb :stateShow ="stateShowBread">
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
          <el-button class="button" v-for="item in categoryOneList" :key="item.id" :loading="cateOneLoading" :value="item.id" @click="getGoodsHandle(item)">{{item.name}}</el-button>
          <div style="margin-left:80px;margin-top:10px;" v-if="showGoodsState">
            <el-button v-if="firstObj.goodsName" :type="buttonType" @click="getDiscountHnadle(firstObj)" class="button">{{clickGoods}}</el-button>&nbsp;&nbsp;
            <span v-if="firstObj.goodsName" class="span-color" @click="moreHandle">更多>></span>
          </div>
          <!-- 二级品类按钮 -->
          <div v-else class="goods">
            <div><el-button class="button" :type="buttonType">{{clickGoods}}</el-button>&nbsp;&nbsp;
            <span class="span-color" @click="retractHandle">收起</span></div>
            <hr style="border:0.5px solid #BBBBBB;"/>
            <div>
              <el-button class="button" v-for="(item, index) in buttonList" :key="item.goods_id" :value="item.goods_id" @click="getDiscountHnadle(item,index)">{{item.goodsName}}</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="状态：">
          <span v-if="status === 0">停用</span>
          <span v-if="status === 1">启用</span>
        </el-form-item>
        <el-form-item label="">
          <discountTable :tableArray="tableArray" :goodsName="goodsName"></discountTable>
        </el-form-item>
      </el-form>
    </div>
    <hint :title="title" v-model="showUpdate" :text="text" @confirm="updateConfirm" />
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
import discountTable from '../discountTable.vue'
import hint from '@/components/Hint'
import {discountDetail, getDiscountGoods, editStatus,getDiscountTable} from '@/api/marketing/discount.js'
import breadcrumb from '@/components/Breadcrumb'
import { dirname } from 'path';
export default {
  components:{
    breadcrumb,hint, discountTable
  },
  data(){
    return{
      clickGoods:'',
      // keyButton:0,
      cateOneLoading:false,
      buttonType:'',
      stateShowBread:false,
      showGoodsState:true,
      name:'',
      shopName: '',
      shopId:'',
      recodeDiscountId:'',
      categoryOneList:[],
      buttonList:[],
      firstObj:{},
      text:'',
      title:'',
      goodsName:'',
      showUpdate:false,
      status:0,
      state:0,
      tableArray:[],
      rowObject:{},
    }
  },
  mounted(){
    this.stateShowBread= true
    if(JSON.stringify(this.$route.params)!== '{}'){
      // this.addEdit = this.$route.params.addEdit
      // this.status = this.$route.params.status
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
      // this.buttonType = 'primary'
    },
    retractHandle(){
      // this.buttonType = 'primary'
      this.showGoodsState = true
    },
     // 查询折扣详情
    getDiscountDetail(){
      discountDetail(this.id).then(res => {
        if(res.status === 1){
          this.rowObject = res.info
          this.name = res.info.name
          this.shopName = res.info.shopName
          this.status = res.info.status
          // 查询折扣表用
          this.shopId = res.info.shopId
          this.recodeDiscountId = res.info.id
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
              this.tableArray = this.detailArrFunction(res.info.goods[0].findPackage)
            }
          }
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询折扣详情出错！')
      })
    },
    // 折扣报数据处理
    detailArrFunction(res){
      let disArr = []
      let object = res
      // 库存
      let stock =this.clearRaWv(JSON.parse(object.stock))
      disArr.push(stock)
      // 日销量
      let salesVolume =this.clearRaWv(JSON.parse(object.salesVolume))
      disArr.push(salesVolume)
      // 利润率
      let profitMargin =this.clearRaWv(JSON.parse(object.profitMargin))
      disArr.push(profitMargin)
      // 利润值
      let profit =this.clearRaWv(JSON.parse(object.profit))
      disArr.push(profit)
      // 店铺会员数
      let member =this.clearRaWv(JSON.parse(object.member))
      disArr.push(member)
      // 会员人均购买力
      let purchasing =this.clearRaWv(JSON.parse(object.purchasing))
      disArr.push(purchasing)
      // 月复购频次
      let frequency =this.clearRaWv(JSON.parse(object.frequency))
      disArr.push(frequency)
      // 会员购买力指数
      let powerIndex =this.clearRaWv(JSON.parse(object.powerIndex))
      disArr.push(powerIndex)
      return disArr
    },
    // 将每项ra和wv置空
    clearRaWv(item){
      item.ra = ''
      item.wv = ''
      return item
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
    switch7(c){
      switch(true){
        case c>=12:
          return 95;break;
        case c<=8&&c<12:
          return 92;break;
        case c<=5&&c<8:
          return 88;break;
        case c<=2.5&&c<5:
          return 85;break;
        case c<2.5:
          return 80;break;
      }
    },
    // 一级品类按钮处理
    getCategoryHandle(idList, objList){
      this.categoryOneList = []
      for(let i=0; i<idList.length; i++){
        for(let j=0; j<objList.length; j++){
          if(idList[i]===objList[j].id){
            if(objList[j].name){
              this.categoryOneList.push(objList[j])
            }
            break
          }else{

          }
        }
      }
      this.getGoodsHandle(this.categoryOneList[0])
    },
    // 查商品
    getGoodsHandle(cateOne){
      this.cateOneLoading = true
      getDiscountGoods(cateOne.id,this.id).then(res => {
        if(res.info.length>0){
          this.buttonType = ''
          this.buttonList=res.info
          this.clickGoods = this.buttonList[0].goodsName
          this.firstObj = this.buttonList[0]
          this.cateOneLoading = false
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询折扣下的商品失败！')
      })
    },
    // 根据商品查折扣包
    getDiscountHnadle(e,index){
      this.buttonType = 'primary'
      this.clickGoods = e.goodsName
      this.goodsName = e.goodsName
      getDiscountTable(this.recodeDiscountId,e.goods_id, this.shopId).then(res => {
        if(res.status === 1){
          let ob = res.info.discountPackageDomain
          // 将每个对象中的C赋值
          let disArray = this.arrFunction(res)
          // 计算每一项
          // if(res.info.computerStock>(2*res.info.salesVolume)){
            for(let i=0;i<disArray.length; i++){
              if(disArray[i].name === '库存'){
                disArray[i].t= (disArray[i].c*(disArray[i].tp/100)).toFixed(2)
                disArray[i].ra=this.switch5(disArray[i].tp)
                if(disArray[i].w){
                  disArray[i].wv= (disArray[i].w*disArray[i].ra/10000).toFixed(2)
                }else{
                  disArray[i].wv = 0
                }
              }else if(disArray[i].name === '会员购买力指数(万)'){
                disArray[i].t= (disArray[i].c*(disArray[i].tp/100)).toFixed(2)
                disArray[i].ra=this.switch7(disArray[i].c)
                if(disArray[i].w){
                  disArray[i].wv= (disArray[i].w*disArray[i].ra/10000).toFixed(2)
                }else{
                  disArray[i].wv = 0
                }
              }else if(disArray[i].index==='2'||disArray[i].index==='3'||disArray[i].index==='4'){
                disArray[i].t= (disArray[i].c*(disArray[i].tp/100)).toFixed(2)
                disArray[i].ra=this.switch6(disArray[i].tp)
                if(disArray[i].w){
                  disArray[i].wv= (disArray[i].w*disArray[i].ra/10000).toFixed(2)
                }else{
                  disArray[i].wv= 0
                }

              }
            }
          // }else{

          // }
          this.tableArray = disArray
        }
      }).catch(err => {
        this.$message.error('折扣表查询出错！')
      })
    },
    // 折扣表table数据处理
    arrFunction(res){
      // 库存s
      let computerStocks = res.info.computerStock
      // 日销量v
      let salesVolumes = res.info.salesVolume
      // 利润率pm
      let profitMargins = res.info.profitMargin
      // 利润值p
      let profits = res.info.profit
      // 店铺会员数m
      let members = res.info.members
      // 会员人均购买力b
      let purchasings = res.info.purchasing
      // 月复购频次fm
      let frequencys = res.info.frequency

      let disArr = []
      let object = res.info.discountPackageDomain

      let stock = JSON.parse(object.stock)
      stock.c = computerStocks
      disArr.push(stock)

      let salesVolume = JSON.parse(object.salesVolume)
      salesVolume.c= salesVolumes
      disArr.push(salesVolume)

      let profitMargin = JSON.parse(object.profitMargin)
      profitMargin.c = profitMargins
      disArr.push(profitMargin)

      let profit = JSON.parse(object.profit)
      profit.c= profits
      disArr.push(profit)

      let member = JSON.parse(object.member)
      member.c =members
      disArr.push(member)

      let purchasing = JSON.parse(object.purchasing)
      purchasing.c = purchasings
      disArr.push(purchasing)

      let frequency = JSON.parse(object.frequency)
      frequency.c = frequencys
      disArr.push(frequency)

      let powerIndex = JSON.parse(object.powerIndex)
      powerIndex.c= (members*purchasings*frequencys)/10000
      disArr.push(powerIndex)

      return disArr
    },

    editHandle(){
      this.rowObject.addEdit = '编辑'
      this.$router.push({name:'discountEditAdd', params:this.rowObject})
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
  width:65%;
  height: 400px;
  background-color: #FFFFFF;
  margin-left:80px;
  margin-top:10px;
  padding:10px;
}
.button{
  margin-top:2px;
}
/* .button:hover{
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
.button:active{
  background-color: #999999;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
} */
</style>
