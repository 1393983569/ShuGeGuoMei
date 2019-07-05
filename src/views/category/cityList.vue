<template>
  <div>
    <breadcrumb>
      <el-button type="primary" @click="showProvince">新建省</el-button>
      <el-button type="primary" @click="showCity">新建市</el-button>
      <el-button type="primary" @click="showCounty">新建区/县</el-button>
    </breadcrumb>
    <el-dialog
      title="新建省"
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
        <el-button @click="dialogChildren = false">取 消</el-button>
        <el-button type="primary" @click="addChildren('省', selectProvince1)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新建市"
      :visible.sync="dialogCity"
      width="40%">
      <el-select @change="changeProvince" v-model="selectProvince2" placeholder="请选择省" style="margin-bottom: 5px; width: 100%">
        <el-option
          v-for="item in optionsProvince"
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
        <el-button @click="dialogChildren = false">取 消</el-button>
        <el-button type="primary" @click="addChildren('市', selectProvince2, selectCity1)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新建区/县"
      :visible.sync="dialogCounty"
      width="40%">
      <el-select @change="changeProvince" v-model="selectProvince3" placeholder="请选择省" style="margin-bottom: 5px; width: 100%">
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
        <el-button @click="dialogChildren = false">取 消</el-button>
        <el-button type="primary" @click="addChildren('区', selectProvince3, selectCity2, selectCounty1)">确 定</el-button>
      </span>
    </el-dialog>
    <!--<el-table-->
      <!--:data="tableData"-->
      <!--:span-method="objectSpanMethod"-->
      <!--border-->
      <!--style="width: 100%; margin-top: 20px">-->
      <!--<el-table-column-->
        <!--prop="name"-->
        <!--label="省">-->
        <!--<template slot-scope="scope" v-if="scope.row.childrenId">-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="primary"-->
            <!--@click="edit(scope.$index, scope.row, '一级')"-->
          <!--&gt;编辑</el-button>-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="danger"-->
            <!--@click="removeData(scope.$index, scope.row, '一级')"-->
          <!--&gt;删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="amount1"-->
        <!--label="市">-->
        <!--<template slot-scope="scope" v-if="scope.row.childrenId">-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="primary"-->
            <!--@click="edit(scope.$index, scope.row, '二级')"-->
          <!--&gt;编辑</el-button>-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="danger"-->
            <!--@click="removeData(scope.$index, scope.row, '二级')"-->
          <!--&gt;删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="amount2"-->
        <!--label="区/县">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="操作"-->
        <!--width="280"-->
      <!--&gt;-->
        <!--<template slot-scope="scope" v-if="scope.row.childrenId">-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="primary"-->
            <!--@click="edit(scope.$index, scope.row, '三级')"-->
          <!--&gt;编辑</el-button>-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="danger"-->
            <!--@click="removeData(scope.$index, scope.row, '三级')"-->
          <!--&gt;删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->
    <!--<el-dialog-->
      <!--title="添加二级品类"-->
      <!--:visible.sync="dialogChildren"-->
      <!--width="40%">-->
      <!--<el-select v-for="" v-model="optionValue" placeholder="请选择一级品类" style="margin-bottom: 5px; width: 100%">-->
        <!--<el-option-->
          <!--v-for="item in optionsStair"-->
          <!--:key="`${item.id}_o`"-->
          <!--:label="item.name"-->
          <!--:value="item.id">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-button @click="addChildrenInput">+</el-button>-->
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogChildren = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="addChildren">确 定</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
  import { selectSysProvince, selectSysCity, selectSysArea, addSysArea } from '@/api/category/cityList'
  import Breadcrumb from '@/components/Breadcrumb'
  export default {
    name: 'cityList',
    components: {
      Breadcrumb
    },
    data() {
      return {
        idList: [],
        dialogProvince: false,
        dialogCity: false,
        dialogCounty: false,
        optionsProvince: [],
        optionsCity: [],
        optionsCounty: [],
        selectProvince1: [],
        selectProvince2: '',
        selectProvince3: '',
        selectCity1: [],
        selectCity2: '',
        selectCounty1: []
      }
    },
    mounted() {

    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {

      },
      edit() {

      },
      removeData() {

      },
      getSelectSysProvince() {
        this.optionsProvince = []
        selectSysProvince().then(res => {
          this.optionsProvince.push(...res.info)
        }).catch(err => {
          console.log(err)
        })
      },
      getSelectSysCity(id) {
        this.optionsCity = []
        selectSysCity(id).then(res => {
          this.optionsCity.push(...res.info)
        }).catch(err => {
          console.log(err)
        })
      },
      getSelectSysArea(id){
        this.optionsCounty = []
        selectSysArea(id).then(res => {
          this.optionsCounty.push(...res.info)
        }).catch(err => {
          console.log(err)
        })
      },
      changeProvince(e) {
        this.getSelectSysCity(e)
      },
      changeCity(e) {
        this.getSelectSysArea(e)
      },
      showProvince() {
        this.dialogProvince = true
        this.selectProvince1 = []
        this.getSelectSysProvince()
      },
      showCity() {
        this.dialogCity = true
        this.selectCity1 = []
        this.selectProvince2 = ''
        this.getSelectSysProvince()
      },
      showCounty() {
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
            console.log(res)
          }).catch(err => {

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
            console.log(res)
          }).catch(err => {

          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
