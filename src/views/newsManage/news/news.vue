<template>
  <div style="margin:20px;">
    <!-- 头部查询 -->
    <div class="size-color" style="display:float;">
      查询类型：<el-select v-model="dateType">
        <el-option v-for="item in dateTypeList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <div v-if="dateState === 2">整年：<el-date-picker v-model="year" type="year" placeholder="选择年" /></div>
      <div v-else-if="dateState === 3">整月：<el-date-picker v-model="month" type="month" placeholder="选择月" /></div>
      <div v-else>日期：<el-date-picker v-model="datePick" type="date" placeholder="选择日期" /></div>
      消息类别：<el-select v-model="newsType">
        <el-option v-for="item in newsTypeList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <div style="float:right;">
        <el-button @click="handleReleaseNews">发布消息</el-button>
        <el-dropdown split-button>
          个人设置
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 列表 -->
    <div class="size-color table-margin-top">
      <el-table :header-cell-style="tableHeaderColor" :data="newsTable" center stripe>
        <el-table-column prop="createTime" label="发布时间" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="object" label="对象" />
        <el-table-column prop="category" label="类型" />
        <el-table-column prop="operate" label="操作" width="220px">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)">查看详情</el-button>
            <el-button @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin:10px;">
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
    <el-dialog :visible.sync="showDelete" center width="380px" title="上架商品" style="border-ra">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否上架该商品？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showDelete = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;" @click="deleteNews">确定</el-button>
      </div>
    </el-dialog>
    <!-- 消息详情 -->
    <news-detail :show-detail="showDetail" :detailt-object="detailtObject" @isCloseDetail="isCloseDetail" />
  </div>
</template>
<script>
import newsDetail from './newsDetail.vue'
import { getNews, deleteNews } from '@/api/news.js'
export default {
  components: { newsDetail },
  data() {
    return {
      // 日期选择
      dateType: 1,
      currentPage: 1,
      sizePage: 10,
      total: 1,
      category: '',
      id: '',
      detailtObject: {},
      dateTypeList: [
        {
          id: 1,
          name: '日期'
        },
        {
          id: 2,
          name: '整年'
        },
        {
          id: 3,
          name: '整月'
        }
      ],
      year: '',
      month: '',
      datePick: '',
      dateState: 1,
      // 消息类别
      newsType: '',
      newsTypeList: [],
      // 消息列表
      newsTable: [],
      // 删除确认
      showDelete: false,
      // 消息详情
      showDetail: false
    }
  },
  watch: {
    'dateType'(e) {
      this.dateState = e
    }
  },
  mounted() {
    this.getNewsList()
  },
  methods: {
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
      obj.year = this.year
      obj.month = this.month
      obj.day = this.day
      obj.category = this.category
      getNews(obj).then(res => {
        console.log(res, 'res....')
        if (res.status === 1) {
          this.total = res.info.totalrecord
          res.info.records.forEach(e => {
            e.category = e.category === 1 ? '资讯' : '通知'
            this.newsTable.push(e)
          })
        } else {
          console.log('操作失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 消息发布
    handleReleaseNews() {
      this.$router.push({ name: 'newsRelease' })
    },
    // 列表头样式设置
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color:#f0f2f3;font-size:18px;color:#6e7b99;font-family:Microsoft YaHei;'
      }
    },
    // 消息删除确认
    handleDelete(row) {
      this.showDelete = true
      this.id = row.id
    },
    // 删除消息
    deleteNews() {
      deleteNews(this.id).then(res => {
        if (res.status === 1) {
          this.$message.success('删除成功！')
          this.getNewsList()
          this.showDelete = false
        } else {
          this.$message.error(res.info)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 显示详情页
    handleDetail(row) {
      console.log(row, 'ooooooo')
      this.showDetail = true
      this.detailtObject = row
    },
    // 关闭详情页
    isCloseDetail(e) {
      this.showDetail = e
    }
  }
}
</script>
<style>
.loginOut{
  float:right;
}
</style>
