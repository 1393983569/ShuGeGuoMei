<template>
  <div>
    <breadcrumb>
      <!-- <el-button type="primary" @click="showProvince">新建省</el-button> -->
      <!-- <el-button type="primary" @click="showCity">新建市</el-button> -->
      <el-button type="primary" @click="showCounty" v-if="bottonList.includes('操作')">新建区/县</el-button>
      <el-button type="primary" v-else disabled>新建区/县</el-button>
    </breadcrumb>
    <el-dialog
      title="新建区/县"
      :visible.sync="dialogCounty"
      modal
      :close-on-click-modal="false"
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
        <el-button @click="dialogCounty = false">取 消</el-button>
        <el-button type="primary" @click="addChildren('区', selectProvince3, selectCity2, selectCounty1)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-dialog
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
    </el-dialog> -->
    <el-table :data="tataTable" :span-method="objectSpanMethod"
      stripe
      border
      style="width:70%;"
      >
      <el-table-column prop="" label="省"/>
      <el-table-column prop="" label="市"/>
      <el-table-column prop="" label="区/县"/>
      <el-table-column prop="" label="操作"/>
    </el-table>
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
        selectCounty1: [],
        tataTable:[],
        bottonList:[],
      }
    },
    beforeRouteEnter (to, form, next) {
    console.log(to)
      next(mv => {
        mv.getButton(mv.$store.getters.buttonRoleList, to.name)
      })
    },
    mounted() {

    },
    methods: {
      getButton(list, name) {
        list.forEach(item => {
          if (item.name === name) {
            this.bottonList = item.checkList
          }
        })
        // console.log(this.bottonList)
      },
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
            this.dialogCounty = false
            this.$message.success('添加成功！')
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
