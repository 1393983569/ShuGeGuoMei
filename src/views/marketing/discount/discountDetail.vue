<template>
  <div>
    <breadcrumb>
     <el-button size="mini" type="success">停用</el-button>
     <el-button size="mini" type="primary">编辑</el-button>
    </breadcrumb>
    <div>
      <el-form>
        <el-form-item label="折扣包名称：">

        </el-form-item>
        <el-form-item label="选择店铺：">

        </el-form-item>
        <el-form-item label="选择商品：">
          <el-button class="button" v-for="item in categoryOneList" :key="item.id" :value="item.id">{{item.name}}</el-button>
          <div style="margin-left:80px;margin-top:10px;" v-if="showGoodsState"><el-button class="button">萝卜丝</el-button>&nbsp;&nbsp;<span class="span-color" @click="moreHandle">更多>></span></div>
          <div v-else class="goods">
            <div><el-button class="button">萝卜丝</el-button>&nbsp;&nbsp;<span class="span-color" @click="retractHandle">收起</span></div>
            <hr style="border:0.5px solid #BBBBBB;"/>
            <div>
              <el-button class="button" v-for="item in categoryOneList" :key="item.id" :value="item.id">{{item.name}}</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="状态：">

        </el-form-item>
        <el-form-item label="">

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import breadcrumb from '@/components/Breadcrumb'
export default {
  components:{
    breadcrumb
  },
  data(){
    return{
      showGoodsState:true,
      categoryOneList:[
        {
          id:'1',
          name: '蔬菜'
        },
        {
          id:'2',
          name: '萝卜'
        },
        {
          id:'3',
          name: '肉类'
        },
        {
          id:'4',
          name: '蛋白质'
        },
      ]
    }
  },
  methods:{
    moreHandle(){
      this.showGoodsState = false
    },
    retractHandle(){
      this.showGoodsState = true
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
