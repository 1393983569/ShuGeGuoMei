<template>
  <div>
    <breadcrumb :stateShow ='false'>
      <!-- <el-button type="primary" @click="showProvince">新建省</el-button>
      <el-button type="primary" @click="showCity">新建市</el-button> -->
      <el-button size="mini" type="primary" @click="showCounty" v-if="bottonList.includes('操作')">开通城市</el-button>
      <el-button size="mini" type="primary" v-else disabled>新建区/县</el-button>
    </breadcrumb>
    <!-- 新建省市区 -->
    <el-dialog
      title="新建区/县"
      :visible.sync="dialogCounty"
      modal
      :close-on-click-modal="false"
      width="40%">
      <el-select @change="changeProvince1" v-model="selectProvince3" placeholder="请选择省" style="margin-bottom: 5px; width: 100%">
        <el-option
          v-for="item in optionsProvince"
          :key="`${item.id}_o`"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select @change="changeCity" v-model="selectCity2" placeholder="请选择市" style="margin-bottom: 5px; width: 100%">
        <el-option
          v-for="item in optionsCity"
          :key="`${item.id}_o`"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select multiple v-model="selectCounty1" placeholder="请选择市" style="margin-bottom: 5px; width: 100%">
        <el-option
          v-for="item in optionsCounty"
          :key="`${item.id}_o`"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCounty = false">取 消</el-button>
        <el-button type="primary" @click="addChildren('区', selectProvince3, selectCity2, selectCounty1)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新建省 -->
    <!-- <el-dialog
      title="新建省"
      modal
      :close-on-click-modal="false"
      :visible.sync="dialogProvince"
      width="40%">
      <el-select multiple v-model="selectProvince1" placeholder="请选择省" style="margin-bottom: 5px; width: 100%">
        <el-option
          v-for="item in optionsProvince"
          :key="`${item.id}_o`"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogProvince = false">取 消</el-button>
        <el-button type="primary" @click="addChildren('省', selectProvince1)">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- 新建市 -->
    <!-- <el-dialog
      title="新建市"
      modal
      :close-on-click-modal="false"
      :visible.sync="dialogCity"
      width="40%">
      <el-select @change="changeProvince" v-model="selectProvince2" placeholder="请选择省" style="margin-bottom: 5px; width: 100%">
        <el-option
          v-for="item in optionsBasicProvince"
          :key="`${item.id}_o`"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select multiple v-model="selectCity1" placeholder="请选择市" style="margin-bottom: 5px; width: 100%">
        <el-option
          v-for="item in optionsCity"
          :key="`${item.id}_o`"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCity = false">取 消</el-button>
        <el-button type="primary" @click="addChildren('市', selectProvince2, selectCity1)">确 定</el-button>
      </span>
    </el-dialog> -->
    <el-table :data="dataList" :span-method="objectSpanMethod"
      stripe
      border
      style="width:90%;"
      >
      <el-table-column prop="" label="省" align="center">
        <template slot-scope="scope">
          {{ scope.row.fatherName}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="市" align="center">
        <template slot-scope="scope">
          {{ scope.row.childrenName}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="区/县" align="center">
        <template slot-scope="scope">
        {{ scope.row.sunName}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" v-if="bottonList.includes('操作')" @click="deleteHandle(scope)">删除</el-button>
          <el-button size="mini" type="danger" v-else disabled>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <hint v-model="showDelete" title="删除省市区" text="是否确认删除？" @confirm="confirmDelete" />
  </div>
</template>

<script>
import virtualList from 'vue-virtual-scroll-list'
import hint from '@/components/Hint'
import { getProvince, getCity, getArea } from '@/api/priovinCityArea.js'
import { selectSysProvince, selectSysCity, selectSysArea, addSysArea, selectAllData,deleteSysArea } from '@/api/category/cityList'
import Breadcrumb from '@/components/Breadcrumb'
import { isNull } from 'util';
  export default {
    name: 'cityList',
    components: {
      Breadcrumb, hint
    },
    data() {
      return {

        idList: [],
        // 新建省市区弹框
        dialogProvince: false,
        dialogCity: false,
        dialogCounty: false,
        // 其他
        optionsProvince: [],
        optionsCity: [],
        optionsCounty: [],
        selectProvince1: [],
        selectProvince2: '',
        selectProvince3: '',
        selectCity1: [],
        selectCity2: '',
        selectCounty1: [],
        tataTable:[],
        bottonList:[],
        totalList:[],
        // 合并单元格合并规则
        spanArr:[],
        spanArrTwo:[],
        // table数据数组
        dataList:[],
        dataListTmp:[],
        // 删除弹框
        showDelete:false,
        // 删除省市区id
        aId:'',
        cId:'',
        pId:'',

      }
    },
    beforeRouteEnter (to, form, next) {
      next(mv => {
        mv.getButton(mv.$store.getters.buttonRoleList, to.name)
      })
    },
    mounted() {
      this.getAllData()
    },
    methods: {
      // 查询所有省市区
      getAllData(){
        selectAllData().then(res => {
          if(res.status === 1){
            this.getCityList(res.info)
            // span是一个{}
            let span = this.gteRule(this.dataList)
            this.spanArr= span.province
            this.spanArrTwo= span.city
          }else{

          }
        }).catch(err => {
          console.log(err)
          this.$message.error('查询出错！')
        })
      },
       // 得到合并规则
      gteRule(err) {
        let listIndex = 0
        let listRule = []
        let listIndex1 = 0
        let listRule1 = []
        err.forEach((item, index) => {
          // 省的合并规则
          if (index === 0) {
            listRule.push(1)
            listIndex = 0
          } else {
            if (err[index].fatherId === err[index - 1].fatherId) {
              listRule[listIndex] += 1
              listRule.push(0)
            } else {
              listRule.push(1)
              listIndex = index
            }
          }
          // 市的合并规则
          if (index === 0) {
            listRule1.push(1)
            listIndex1 = 0
          } else {
            if (err[index].childrenId === err[index - 1].childrenId) {
              listRule1[listIndex1] += 1
              listRule1.push(0)
            } else {
              listRule1.push(1)
              listIndex1 = index
            }
          }
        })
        let spanObj = {}
        spanObj.province = listRule
        spanObj.city = listRule1
        // 将合并规则返回
        return spanObj
      },
      // 合并列方法
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        // 合并第一列
        if (columnIndex === 0 ) {
          const _row = this.spanArr[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        // 合并第二列
        if(columnIndex === 1){
          const rows = this.spanArrTwo[rowIndex]
          const cols = rows > 0 ? 1 : 0
          return {
            rowspan: rows,
            colspan: cols
          }
        }
      },
      // 展开后台返回的市
      getCityList(arr) {
        this.dataListTmp = []
        arr.forEach(item => {
          if (item.allCity) {
            // 省份下有市
            item.allCity.forEach(itemx => {
              if(itemx){
                let data = {}
                data.fatherName = item.name
                data.fatherId = item.id
                data.childrenName = itemx.name
                data.childrenId = itemx.id
                if(itemx.allCity){
                  // 复制
                  data.allCity = itemx.allCity
                }
                this.dataListTmp.push(data)
              }else{
                let data = {}
                data.fatherName = item.name
                data.fatherId = item.id
                this.dataListTmp.push(data)
              }
            })
          } else {
            // 省份下没市
            let data = {}
            data.fatherName = item.name
            data.fatherId = item.id
            this.dataListTmp.push(data)
          }
        })
        this.getCountry(this.dataListTmp)
      },
      // 展开后台返回的品区县
      getCountry(arr){
        // return
        this.dataList = []
        arr.forEach(item => {
          if (item.allCity) {
            item.allCity.forEach(itemx => {
              if(itemx){
                let data = {}
                data.fatherName = item.fatherName
                data.fatherId = item.fatherId
                data.childrenName = item.childrenName
                data.childrenId = item.childrenId
                data.sunName = itemx.name
                data.sunId = itemx.id
                this.dataList.push(data)
              }else{
                let data = {}
                data.fatherName = item.fatherName
                data.fatherId = item.fatherId
                data.childrenName = item.childrenName
                data.childrenId = item.childrenId
                this.dataList.push(data)
              }
            })
          }else{
            if(item.childrenId){
              let data = {}
              data.fatherName = item.fatherName
              data.fatherId = item.fatherId
              data.childrenName = item.childrenName
              data.childrenId = item.childrenId
              this.dataList.push(data)
            }else{
              let data = {}
              data.fatherName = item.fatherName
              data.fatherId = item.fatherId
              this.dataList.push(data)
            }
          }
        })
      },
      // 按钮权限（操作、查看）
      getButton(list, name) {
        list.forEach(item => {
          if (item.name === name) {
            this.bottonList = item.checkList
          }
        })
      },
      // 删除按钮操作
      deleteHandle(res){
        this.showDelete = true
        this.deleteObj = res.row

        if(this.deleteObj.sunId){
          this.aId = this.deleteObj.sunId
        }else if(this.deleteObj.childrenId){
          this.cId = this.deleteObj.childrenId
        }else if(this.deleteObj.fatherId){
          this.pId = this.deleteObj.fatherId
        }

      },
      confirmDelete(){
        deleteSysArea(this.pId, this.cId, this.aId).then(res => {
          if(res.status === 1){
            this.$message.success('删除成功！')
            this.showDelete = false
            this.getAllData()
          }
        }).catch(err => {
          this.$message.error('删除失败！')
        })
      },
      edit() {},
      removeData() {},
      // 所有省份
      getSelectSysProvince() {
        this.optionsProvince = []
        selectSysProvince().then(res => {
          this.optionsProvince.push(...res.info)
        }).catch(err => {
          console.log(err)
        })
      },
      // 所有市
      getSelectSysCity(id) {
        this.optionsCity = []
        selectSysCity(id).then(res => {
          this.optionsCity.push(...res.info)
        }).catch(err => {
          console.log(err)
        })
      },
      // 所有区
      getSelectSysArea(id){
        this.optionsCounty = []
        selectSysArea(id).then(res => {
          this.optionsCounty.push(...res.info)
        }).catch(err => {
          console.log(err)
        })
      },
      changeCity(e) {
        this.selectCounty1= []
        this.getSelectSysArea(e)
      },
      changeProvince1(e) {
        this.selectCity2 = ''
        this.selectCounty1 = []
        this.getSelectSysCity(e)
      },
      showProvince() {
        this.dialogProvince = true
        this.selectProvince1 = []
        this.getSelectSysProvince()
      },
      showCity() {
        this.optionsCity = []
        this.selectBasicProvince()
        this.dialogCity = true
        this.selectCity1 = []
        this.selectProvince2 = ''
        // this.getSelectSysProvince()
      },
      showCounty() {
        this.optionsCity = []
        this.optionsCounty = []
        this.dialogCounty = true
        this.selectProvince3 = ''
        this.selectCity2 = ''
        this.selectCounty1 = []
        this.getSelectSysProvince()
      },
      addChildren(state, province, city, couny) {
        if (state === '省') {
          let list = []
          province.forEach(item => {
            list.push({
              provinceId: item
            })
          })
          addSysArea(list).then(res => {
            console.log(res)
          }).catch(err => {

          })
        } else if (state === '市') {
          let list = []
          city.forEach(item => {
            list.push({
              provinceId: province,
              cityId: item
            })
          })
          addSysArea(list).then(res => {
            this.dialogProvince = false
            this.dialogCity = false
            this.dialogCounty = false
            this.$message.success('添加成功！')
            this.getAllData()
            console.log(res)
          }).catch(err => {
            this.$message.error('添加失败！')
          })
        } else {
          let list = []
          couny.forEach(item => {
            list.push({
              provinceId: province,
              cityId: city,
              areaId: item
            })
          })
          addSysArea(list).then(res => {
            this.dialogProvince = false
            this.dialogCity = false
            this.dialogCounty = false
            this.$message.success('添加成功！')
            this.getAllData()
          }).catch(err => {
            console.log(err)
            this.$message.error('添加失败！')
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
