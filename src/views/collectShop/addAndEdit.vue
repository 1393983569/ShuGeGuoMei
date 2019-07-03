<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-form-item label="一级品类：" prop="categoryOneId">
      <el-select v-model="ruleForm.categoryOneId" clearable placeholder="请选择" style="width: 500px">
        <el-option
          v-for="item in firstList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="二级品类：" prop="categoryTwoId">
      <el-select v-model="ruleForm.categoryTwoId" clearable placeholder="请选择" style="width: 500px">
        <el-option
          v-for="item in secondList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="商品名称：" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请输入内容" style="width: 500px" />
    </el-form-item>
    <el-form-item label="缩略图：" prop="name">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="ruleForm.smallImg" :src="ruleForm.smallImg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
    </el-form-item>
    <el-form-item label="展示图：" prop="name">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="ruleForm.bigImg" :src="ruleForm.bigImg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
    </el-form-item>
    <el-form-item label="标签：" prop="tab">
      <el-tag
        v-for="tag in ruleForm.tab"
        :key="tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        ref="saveTagInput"
        v-model="inputValue"
        class="input-new-tag"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
    </el-form-item>
    <el-form-item label="规格：" prop="standards">
      <el-input v-model="ruleForm.standards" placeholder="请输入内容" style="width: 500px" />
    </el-form-item>
    <el-form-item label="单位：" prop="unit">
      <el-input v-model="ruleForm.unit" placeholder="请输入内容" style="width: 500px" />
    </el-form-item>
    <el-form-item label="备注：" prop="remark">
      <el-input v-model="ruleForm.remark" placeholder="请输入内容" style="width: 500px" />
    </el-form-item>
    <el-form-item label="保质期：" prop="qualityDate">
      <el-date-picker
        v-model="ruleForm.qualityDate"
        align="right"
        type="date"
        placeholder="选择日期"
        style="width: 500px"
        value-format="yyyy-MM-dd"
      />
    </el-form-item>
    <el-form-item label="保鲜期：" prop="freshDate">
      <el-input v-model="ruleForm.freshDate" placeholder="请输入保鲜期" style="width:200px;" /> 小时
    </el-form-item>
    <el-form-item label="产地：" prop="provinceId">
      <el-select v-model="ruleForm.countryId " clearable placeholder="请选择" style="width: 100px">
        <el-option
          v-for="item in countryList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <div v-if="ruleForm.countryId === 999999" />
      <selectorAddress v-else :province1id="ruleForm.provinceId+''" :city1id="ruleForm.cityId+''" :county1id="ruleForm.areaId+''" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty" />
    </el-form-item>
    <el-form-item label="状态：" prop="state">
      <el-select v-model="ruleForm.state" clearable placeholder="请选择" style="width: 500px">
        <el-option
          v-for="item in stateList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="进价：" prop="purchasePrice">
      <el-input v-model="ruleForm.purchasePrice" placeholder="请输入内容" style="width: 500px" />
    </el-form-item>
    <el-form-item label="出价：" prop="sellPrice">
      <el-input v-model="ruleForm.sellPrice" placeholder="请输入内容" style="width: 500px" />
    </el-form-item>
    <el-form-item label="零售价：" prop="price">
      <el-input v-model="ruleForm.price" placeholder="请输入内容" style="width: 500px" />
      <div style="margin-top:5px;font-weight:bold;">零售价参考价</div>
      <el-table :data="getAddressTable" size="mini" style="width:450px;">
        <el-table-column prop="getAddress" label="采集点" />
        <el-table-column prop="price" label="价格" />
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getFirstCategory, getSecondCategory } from '@/api/category.js'
import { addGoods } from '@/api/collectShop.js'
import selectorAddress from '@/components/selectorAddress/selectorAddress.vue'
export default {
  name: 'AddAndEdit',
  components: { selectorAddress },
  data() {
    return {
      getAddressTable: [
        {
          getAddress: '采集点1',
          price: '￥3.00'
        },
        {
          getAddress: '采集点1',
          price: '￥3.00'
        },
        {
          getAddress: '采集点1',
          price: '￥3.00'
        },
        {
          getAddress: '采集点1',
          price: '￥3.00'
        }
      ],
      imageUrl: '',
      stateList: [
        {
          id: 0,
          name: '有货'
        },
        {
          id: 1,
          name: '缺货'
        }
      ],
      countryList: [
        {
          id: 999999,
          name: '国外'
        },
        {
          id: 888888,
          name: '国内'
        }
      ],
      options: [
        {
          label: 'sssss',
          value: '0'
        },
        {
          label: 'sssss',
          value: '4'
        },
        {
          label: 'sssss',
          value: '8'
        }
      ],
      firstList: [],
      secondList: [],
      ruleForm: {
        provinceId: '',
        cityId: '',
        areaId: '',
        name: '',
        categoryOneId: '',
        categoryTwoId: '',
        // tab: '',
        standards: '',
        unit: '',
        remark: '',
        qualityDate: '',
        freshDate: '',
        // areaId: '',
        // provinceId: '',
        state: '',
        purchasePrice: '',
        sellPrice: '',
        price: '',
        tab: [],
        countryId: 888888,
        smallImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555915007260&di=16a2e0ba1a7ab1e77c9d4cf59328e98c&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-01-05%2F5a4f43d14f85a.jpg',
        bigImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555915007260&di=16a2e0ba1a7ab1e77c9d4cf59328e98c&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-01-05%2F5a4f43d14f85a.jpg'
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        // provinceId:[{ required: true, message: '请选择地址', trigger: 'blur' }],
        // cityId: [{ required: true, message: '请输入', trigger: 'blur' }],
        // countyId: [{ required: true, message: '请输入', trigger: 'blur' }],
        // firstList:[{ required: true, message: '请输入', trigger: 'blur' }],
        // secondList:[{ required: true, message: '请输入', trigger: 'blur' }],
        tab: [{ required: true, message: '请输入', trigger: 'blur' }],
        categoryOneId: [{ required: true, message: '请选择一级品类', trigger: 'blur' }],
        categoryTwoId: [{ required: true, message: '请选择二级品类', trigger: 'blur' }],
        // tab: [{ required: true, message: '请添加标签', trigger: 'blur' }],
        standards: [{ required: true, message: '请输入规格', trigger: 'blur' }],
        unit: [{ required: true, message: '请输入单位', trigger: 'blur' }],
        // remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        qualityDate: [{ required: true, message: '请选择保质期', trigger: 'blur' }],
        freshDate: [{ required: true, message: '请选择保鲜期', trigger: 'blur' }],
        // areaId: [{ required: true, message: '请输入', trigger: 'blur' }],
        // provinceId: [{ required: true, message: '请输入', trigger: 'blur' }],
        state: [{ required: true, message: '请选择状态', trigger: 'blur' }],
        purchasePrice: [{ required: true, message: '请输入进价', trigger: 'blur' }],
        sellPrice: [{ required: true, message: '请输入出价', trigger: 'blur' }],
        price: [{ required: true, message: '请输入零售价', trigger: 'blur' }]
      },
      // dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      goodsObject: []
    }
  },
  watch: {
    // 查询一级品类下的二级品类
    'ruleForm.categoryOneId'(e) {
      if (e) {
        getSecondCategory(e).then(res => {
          console.log(res)
          if (res.info.length > 0) {
            this.secondList = res.info
          } else {
            this.$message.info('此以及品类下暂无二级品类！')
          }
        }).catch(err => {
          console.log(err)
          this.$message.warning('暂无二级品类')
        })
      }
    }
  },
  mounted() {
    this.getFirstCategory()
  },
  methods: {
    getProvince(e) {
      this.ruleForm.provinceId = e
    },
    getCity(e) {
      this.ruleForm.cityId = e
    },
    getCounty(e) {
      this.ruleForm.areaId = e
    },
    // 查询一级品类
    getFirstCategory() {
      getFirstCategory().then(res => {
        // console.log(res, 'kkkkkkkkkk')
        if (res.info.length > 0) {
          this.firstList = res.info
        } else {
          this.$message.warning('暂无一级品类')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询一级品类出错！')
      })
    },
    // 上传图片
    handleAvatarSuccess(file) {

    },
    beforeAvatarUpload(file) {

    },
    // 添加商品
    addGoods() {
      this.goodsObject = JSON.parse(JSON.stringify(this.ruleForm))
      if (this.goodsObject.tab.length > 0) {
        this.goodsObject.tab = this.goodsObject.tab.toString()
      } else {
        this.goodsObject.tab = ''
      }
      this.goodsObject.state = this.goodsObject.state + ''
      addGoods(this.goodsObject).then(res => {
        this.$message.success('添加商品成功')
      }).catch(err => {
        console.log(err)
        this.$message.error('添加商品失败！')
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addGoods()
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleClose(tag) {
      console.log(tag, 'hhhhhh')
      this.ruleForm.tab.splice(this.ruleForm.tab.indexOf(tag), 1)
    },
    showInput() {
      // console.log('ssssssssssssss')
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      // this.ruleForm.tab = []
      // inputValue是输入框绑定值
      const inputValue = this.inputValue
      if (inputValue) {
        this.ruleForm.tab.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #b3b3b3;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
