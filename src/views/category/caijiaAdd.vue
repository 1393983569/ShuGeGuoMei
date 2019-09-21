<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
        <p>市场名称：<el-input style="width:200px;" placeholder="请输入名称"/></p>
        <p>
          市场类型：<el-select v-model="shichang" style="width:200px;">
                    <el-option v-for="item in shichangList" :key="item.id" :value="item.id" :label="item.name" />
                  </el-select>
        </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addhandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {addCaijia, editCaijia} from '@/api/category/caijia.js'
export default {
  props:{
    close:{
      default:false,
      type:Boolean
    }
  },
  data(){
    return{
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
    }
  },
  watch:{
    'close'(e){
      this.dialogVisible = e
    }
  },
  methods:{
    addhandle(){},
    handleClose(){},
  }
}
</script>
