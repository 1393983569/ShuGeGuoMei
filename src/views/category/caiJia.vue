<template>
  <div>
    <breadcrumb>
      <el-button type="primary" size="mini" @click="addCijiaHandle">新建</el-button>
      <!-- <el-button type="primary" size="mini" v-else disabled>新建</el-button> -->
    </breadcrumb>
    <div>
      <el-button @click="allArea">全部区域</el-button>
      <selector-address :province1id="provinceId" :city1id="cityId" :county1id="areaId" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty"/>
    </div>
    <el-table
      :data="tableData"
      :header-cell-style="{   }"
      center
      stripe>
      <el-table-column prop="" label="名称"/>
      <el-table-column  prop="" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editCaijiaHandle">编辑</el-button>
          <el-button type="danger" @click="deleteCaijiaHandle">删除</el-button>
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
        width="30%"
        :before-close="handleClose">
          <p>市场名称：<el-input style="width:200px;" placeholder="请输入名称"/></p>
          <p>
            市场类型：<el-select v-model="shichang" style="width:200px;">
                      <el-option v-for="item in shichangList" :key="item.id" :value="item.id" :label="item.name" />
                    </el-select>
          </p>
          <p>
            <selector-address :province1id="provinceId" :city1id="cityId" :county1id="areaId" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty"/>
          </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addhandle">确 定</el-button>
        </span>
      </el-dialog>
      <hint title="删除采价" v-model="showDelete" text="是否删除蔡家市场？" @confirm="deleteAdConfirm" />
  </div>
</template>
<script>
import hint from '@/components/Hint'
import caijiaAdd from './caijiaAdd.vue'
import Breadcrumb from '@/components/Breadcrumb'
import selectorAddress from '@/components/selectorAddress/selectorAddress.vue'
import {selectCaijia, addCaijia, editCaijia, deleteCaijia} from '@/api/category/caijia.js'
export default {
  data(){
    return{
      tableData:[],
      total: 0,
      pagesize: 10,
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
    }
  },
  components:{selectorAddress, Breadcrumb, hint, caijiaAdd},
  methods:{
    getCaijiaList(){
      let data = {}
      data.pageSize = this.pageSize
      data.pageNum = this.pageNum
      data.provinceId = this.provinceId
      data.cityId = this.cityId
      data.areaId = this.areaId
      selectCaijia(data).then(res=> {}).catch(err => {})
    },
    allArea(){},
     handleSizeChange(e) {
      this.pageSize = e
    },
    handleCurrentChange(e) {
      this.pageNum = e
    },
    getProvince(id) {
      this.provinceId = id
    },
    getCity(id) {
      this.cityId = id
    },
    getCounty(id) {
      this.areaId = id
    },
    addCijiaHandle(){
      this.closeState = true
    },
    deleteAdConfirm(){},
    editCaijiaHandle(){
      this.closeState = true
    },
    deleteCaijiaHandle(){},
  }
}
</script>
