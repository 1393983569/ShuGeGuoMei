<template>
  <div>
    <breadcrumb :stateShow ="stateShow">
      <el-button type="primary" size="mini" v-if="bottonList.includes('操作')" @click="handleRelease">广告发布</el-button>
      <el-button type="primary" size="mini" v-else disabled @click="handleRelease">广告发布</el-button>
    </breadcrumb>
    <el-table v-loading="loadingTable" :data="ADTable" center stripe>
      <el-table-column prop="createTime" label="发布时间" />
      <el-table-column prop="title" label="标题">
        <span slot-scope="scope" class="outer">
          {{scope.row.title}}
        </span>
      </el-table-column>
      <el-table-column prop="picture" label="轮播图">
        <template slot-scope="scope">
          <img v-if="scope.row.imge" :src="scope.row.imge" class="avatar" style="width:240px;height:80px;">
        </template>
      </el-table-column>
      <el-table-column prop="status" label="上下架状态"/>
      <el-table-column prop="operate" :width="460" label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" v-if="bottonList.includes('查看'||'操作')" @click="handleDetail(scope.row)">查看详情</el-button>
          <el-button type="warning" size="mini" v-else disabled>查看详情</el-button>
          <el-button size="mini" type="success" v-if="bottonList.includes('操作')&&scope.row.status === '已上架'" @click="handleStick(scope.$index, scope.row)">置顶</el-button>
          <el-button size="mini" type="success" v-else disabled>置顶</el-button>
          <el-button type="primary" size="mini" v-if="bottonList.includes('操作')&&scope.row.status === '已下架'" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" v-else-if="bottonList.includes('操作')&&scope.row.status === '上架'" @click="handleEditShelf">编辑</el-button>
          <el-button type="primary" size="mini" v-else disabled>编辑</el-button>
          <el-button type="up" size="mini" v-if="bottonList.includes('操作')&&scope.row.status ==='已上架'" @click="putawayHandle(scope.row)">下架</el-button>
          <el-button type="down" size="mini" v-if="bottonList.includes('操作')&&scope.row.status ==='已下架'" @click="putawayHandle(scope.row)">上架</el-button>
          <el-button type="danger" size="mini" v-if="bottonList.includes('操作')&&scope.row.status==='已下架'" @click="deleteHandle(scope.row)">删除</el-button>
          <el-button type="danger" size="mini" v-else disabled>删除</el-button>
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
    <!-- 上架/下架 -->
    <!-- <el-dialog :visible.sync="showShelf" center width="380px" :title="`${shelfTitle}`+`广告`">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否{{ shelfTitle }}该条广告？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showShelf = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;" @click="shelfAdConfirm">确定</el-button>
      </div>
    </el-dialog> -->
    <hint v-model="showShelf" :title="`${shelfTitle}`+`广告`" :text="`是否${shelfTitle}该条广告？`" @confirm="shelfAdConfirm" />
    <!-- 删除 -->
    <hint v-model="showDelete" title="删除广告" text="是否删除该条广告？" @confirm="deleteAdConfirm" />
    <!-- 广告详情 -->
    <!-- <ad-detail :adminName="adminName" :show-ad-detail="showAdDetail" :ad-object="adObject" @handleClose="handleClose" /> -->
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
import hint from '@/components/Hint'
import AdDetail from './ADDetail.vue'
import Breadcrumb from '@/components/Breadcrumb'
import { getAdvertisement, shelfAdvertisement, deleteAdvertisement, topAdvertisement } from '@/api/advertisement.js'
export default {
  components: { AdDetail, Breadcrumb, hint},
  data() {
    return {
      loadingTable:false,
      ADTable: [],
      showAdDetail: false,
      showAdEdit: false,
      stateShow:false,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      adObject: {},
      shelfTitle: '',
      showShelf: false,
      id: '',
      istop:0,
      shelfStatus: '',
      showDelete: false,
      editObject: {},
      bottonList: [],
      apiUrl: '',
      adminName:'',
    }
  },
 beforeRouteEnter (to, form, next) {
    next(mv => {
      mv.getButton(mv.$store.getters.buttonRoleList, to.name)
  	})
  },
  mounted() {
    this.apiUrl = process.env.VUE_APP_BASE_API
    this.getAdvertiseList()
    // console.log(this.$store, '&&&&&&&&&&&')
    // console.log(this.bottonList, '@@@@@@@@@@@@@@@@@@@@@@@', this)
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
    // 分页
    handleSizeChange(e) {
      this.pageSize = e
      this.getAdvertiseList()
    },
    handleCurrentChange(e) {
      this.pageNum = e
      this.getAdvertiseList()
    },
    // headerStyle({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex === 0) {
    //     return ' font-size:18px;color:#6e7b99;font-family:Microsoft YaHei;'
    //   }
    // },
    // 查询广告列表
    getAdvertiseList() {
      this.loadingTable = true
      this.ADTable = []
      getAdvertisement(this.pageNum, this.pageSize).then(res => {
        this.loadingTable = false
        this.total = res.info.totalrecord
        res.info.records.forEach(e => {
          e.status = e.status === 0 ? '已上架' : '已下架'
          this.ADTable.push(e)
        })
      }).catch(err => {
        this.loadingTable = false
        console.log(err)
        this.$message.error('查询广告失败！')
      })
    },
    // 广告发布
    handleRelease() {
      this.$router.push({ name: 'ADRelease' })
    },
    // 查看详情
    handleDetail(row) {
      // this.adObject = row
      row.adminName = this.$store.state.user.name
      // this.showAdDetail = true
      this.$router.push({
        name:'ADDetail',
        params:row
      })
    },
    // 关闭详情
    handleClose(e) {
      this.showAdDetail = e
    },
    // 编辑广告
    handleEdit(row) {
      this.$router.push({ name: 'ADRelease',params: { row: row} })
    },
    // 关闭编辑
    closeEdit(e) {
      this.showAdEdit = e
    },
    // 上架/下架
    putawayHandle(row) {
      // console.log(row, 'kkkkkk')
      this.showShelf = true
      this.shelfTitle = row.status === '已下架' ? '上架' : '下架'
      this.shelfStatus = row.status === '已下架' ? 0 : 1
      this.id = row.id
    },
    shelfAdConfirm() {
      shelfAdvertisement(this.shelfStatus, this.id).then(res => {
        if (res.status === 1) {
          this.$message.success(this.shelfTitle + '广告成功！')
          this.showShelf = false
          this.getAdvertiseList()
        } else {
          this.$message.error(this.shelfTitle + '广告失败！')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(this.shelfTitle + '广告失败！')
      })
    },
    // 置顶广告
    handleStick(index, row) {
      this.id = row.id
      this.topAdvertisement()
    },
    // 置顶广告
    topAdvertisement(){
      this.istop = 1
      topAdvertisement(this.id, this.istop).then(res => {
        if(res.status === 1){
          this.$message.success('置顶成功！')
          this.getAdvertiseList()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('置顶失败！')
      })
    },
    // 删除广告
    deleteHandle(row) {
      this.showDelete = true
      this.id = row.id
    },
    deleteAdConfirm() {
      deleteAdvertisement(this.id).then(res => {
        if (res.status === 1) {
          this.$message.success('删除广告成功')
          this.showDelete = false
          this.getAdvertiseList()
        } else {
          this.$message.error('删除广告失败！')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('删除广告失败！')
      })
    },


    // 上架广告不可编辑提示
    handleEditShelf() {
      this.$alert('该广告已上架，不可编辑!', '提示', {
        type: 'warning',
        // center: true
      })
    }
  }
}
</script>
<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 150px;
    align-items: center;
    margin: 0;
    text-align: center;
  }
  .outer{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
