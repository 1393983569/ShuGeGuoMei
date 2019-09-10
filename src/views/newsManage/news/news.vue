<template>
  <div>
    <breadcrumb>
      <el-button type="primary" v-if="buttonList.includes('操作')" @click="handleReleaseNews" size="mini">发布消息</el-button>
      <el-button type="primary" v-else disabled @click="handleReleaseNews" size="mini">发布消息</el-button>
    </breadcrumb>
    <!-- 头部查询 -->
    <div style="display:flex;flex-direction:row;">
      <pickDate @getPickDate="handlePickDate" :showDayState="showDayState" :yearPro="yearPro" :monthPro="monthPro" :dayPro="dayPro"></pickDate>&nbsp;
      消息类别：
      <el-select v-model="newsType" size="mini" style="width:120px;">
        <el-option v-for="item in newsTypeList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <div style="position:absolute;right:4px;">
        <el-button size="mini" v-if="buttonList.includes('操作')" type="primaryX" @click="handleSearch">筛选</el-button>
        <el-button size="mini" v-else disabled type="primaryX">筛选</el-button>
        <el-button size="mini" v-if="buttonList.includes('操作')" type="info" @click="handleClear">清空</el-button>
        <el-button size="mini" v-else disabled type="info">清空</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <div class="size-color">
      <el-table :data="newsTable" center stripe>
        <el-table-column prop="createTime" label="发布时间" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="category" label="类型" />
        <el-table-column prop="shopJson" label="对象" :width="500">
          <template slot-scope="scope">
            <span v-for="item in scope.row.shopJson">{{item.name}}&nbsp;|&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" :width="300">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" v-if="buttonList.includes('查看'||'操作')" @click="handleDetail(scope.row)">查看详情</el-button>
            <el-button type="warning" size="mini" v-else disabled>查看详情</el-button>
            <el-button type="danger" size="mini" v-if="buttonList.includes('操作')" @click="handleDelete(scope.row)">删除</el-button>
            <el-button type="danger" size="mini" v-else disabled>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          :page-sizes="[10, 15]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 删除确认弹框 -->
    <hint v-model="showDelete" title="删除消息" text="是否删除该消息？" @confirm="deleteNews" />
    <!-- 消息详情 -->
    <news-detail :show-detail="showDetail" :detailt-object="detailtObject" @isCloseDetail="isCloseDetail" />
  </div>
</template>
<script>
import hint from '@/components/Hint'
import newsDetail from './newsDetail.vue'
import Breadcrumb from '@/components/Breadcrumb'
import pickDate from '@/components/pickDate'
import { getNews, deleteNews } from '@/api/news.js'
export default {
  name:'news',
  components: { newsDetail, Breadcrumb, hint, pickDate },
  data() {
    return {
      showDayState:false,
      yearPro:'',
      monthPro:'',
      dayPro:'',
      // 日期选择
      dateType: 1,
      currentPage: 1,
      sizePage: 10,
      total: 0,
      category: '',
      id: '',
      detailtObject: {},
      year: '',
      month: '',
      day:'',
      datePick: '',
      dateState: 1,
      // 消息类别
      newsType: '',
      newsTypeList: [
        {
          id: 0,
          name: '通知'
        },
        {
          id: 1,
          name: '资讯'
        }
      ],
      // 消息列表
      newsTable: [],
      // 删除确认
      showDelete: false,
      // 消息详情
      showDetail: false,
      buttonList: [],
    }
  },
  beforeRouteEnter(to, from, next) {
    next(mv => {
      mv.getButton(mv.$store.getters.buttonRoleList, to.name)
    })
  },
  watch: {
    'dateType'(e) {
      this.dateState = e
    }
  },
  mounted() {
    this.showDayState = true
    this.getNewsList()
  },
  methods: {
    getButton(list, name) {
      list.forEach(item => {
        if(item.name === name){
          console.log(item.checkList, 'jjjjj')
          this.buttonList = item.checkList
        }
      })
    },
    // 分页方法
    handleSizeChange(e) {
      this.sizePage = e
      this.getNewsList()
    },
    handleCurrentChange(e) {
      this.currentPage = e
      this.getNewsList()
    },
    // 查询消息列表
    getNewsList() {
      this.newsTable = []
      const obj = {}
      obj.pageNum = this.currentPage
      obj.pageSize = this.sizePage
      obj.year = this.yearPro
      obj.month = this.monthPro
      obj.day = this.dayPro
      obj.category = this.category
      getNews(obj).then(res => {
        this.total = res.info.totalrecord
        // const array = []
        res.info.records.forEach(e => {
          e.shopJson = JSON.parse(e.shopJson)
          e.category = e.category === 1 ? '资讯' : '通知'
          this.newsTable.push(e)
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('查询失败')
      })
    },
    handleSearch(){
      this.getNewsList()
    },
    handleClear(){
      this.yearPro = ''
      this.monthPro = ''
      this.month = ''
      this.day = ''
      this.category = ''
      this.newsType = ''
      this.getNewsList()
    },
    // 消息发布
    handleReleaseNews() {
      this.$router.push({ name: 'newsRelease' })
    },
    // 列表头样式设置
    // tableHeaderColor({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex === 0) {
    //     return ' font-size:18px;color:#6e7b99;font-family:Microsoft YaHei;'
    //   }
    // },
    // 消息删除确认
    handleDelete(row) {
      this.showDelete = true
      this.id = row.id
    },
    // 删除消息
    deleteNews() {
      deleteNews(this.id).then(res => {
        this.$message.success('删除成功！')
        this.getNewsList()
        this.showDelete = false
      }).catch(err => {
        console.log(err)
        this.$message.error('删除失败')
      })
    },
    // 显示详情页
    handleDetail(row) {
      // console.log(row, 'ooooooo')
      this.showDetail = true
      this.detailtObject = row
    },
    // 关闭详情页
    isCloseDetail(e) {
      this.showDetail = e
    },
    // 筛选条件-时间
    handlePickDate(date){
      date = date+'-'
      let dateArr = date.split('-')
      console.log(dateArr, 'date')
      if(dateArr.length === 2){
        this.yearPro = dateArr[0]
      }else if(dateArr.length === 3) {
        this.yearPro = dateArr[0]
        this.monthPro = dateArr[1]
      }else if(dateArr.length === 4){
        this.yearPro = dateArr[0]
        this.monthPro = dateArr[1]
        this.dayPro = dateArr[2]
      }
    }
  }
}
</script>
<style>
.loginOut{
  float:right;
}
</style>
