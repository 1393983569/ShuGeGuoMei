<template>
  <div class="body-margin" style="display:float;">
    <breadcrumb>
      <el-button type="primary" size="mini" v-if="bottonList.includes('操作')" @click="handleRelease">广告发布</el-button>
      <el-button type="primary" size="mini" v-else disabled @click="handleRelease">广告发布</el-button>
    </breadcrumb>

    <el-table :data="ADTable" center stripe>
      <el-table-column prop="createTime" label="发布时间" />
      <el-table-column prop="tile" label="标题" />
      <el-table-column prop="picture" label="轮播图">
        <template slot-scope="scope">
          <img v-if="scope.row.imge" :src="scope.row.imge" class="avatar" style="width:100px;height:100px;">
        </template>
      </el-table-column>
      <el-table-column prop="status" label="上下架状态" />
      <el-table-column prop="operate" :width="460" label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" v-if="bottonList.includes('查看'||'操作')" @click="handleDetail(scope.row)">查看详情</el-button>
          <el-button type="warning" size="mini" v-else disabled>查看详情</el-button>
          <el-button size="mini" type="success" v-if="bottonList.includes('操作')" @click="handleStick(scope.$index, scope.row)">置顶</el-button>
          <el-button size="mini" type="success" v-else disabled>置顶</el-button>
          <el-button type="primary" size="mini" v-if="bottonList.includes('操作')&&scope.row.status === '下架'" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" v-else-if="bottonList.includes('操作')&&scope.row.status === '上架'" @click="handleEditShelf">编辑</el-button>
          <el-button type="primary" size="mini" v-else disabled>编辑</el-button>
          <el-button type="success" size="mini" v-if="bottonList.includes('操作')" @click="putawayHandle(scope.row)">{{ state = scope.row.status === "上架" ? '下架': '上架' }}</el-button>
          <el-button type="success" size="mini" v-else disabled>{{ state = scope.row.status === "上架" ? '下架': '上架' }}</el-button>
          <el-button type="danger" size="mini" v-if="bottonList.includes('操作')" @click="deleteHandle(scope.row)">删除</el-button>
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
    <el-dialog :visible.sync="showShelf" center width="380px" :title="`${shelfTitle}`+`广告`">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否{{ shelfTitle }}该条广告？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showShelf = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;" @click="shelfAdConfirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog :visible.sync="showDelete" center width="380px" title="删除广告">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否删除该条广告？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showDelete = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;" @click="deleteAdConfirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 广告详情 -->
    <ad-detail :show-ad-detail="showAdDetail" :ad-object="adObject" @handleClose="handleClose" />
  </div>
</template>
<script>
import AdDetail from './ADDetail.vue'
import Breadcrumb from '@/components/Breadcrumb'
import { getAdvertisement, shelfAdvertisement, deleteAdvertisement } from '@/api/advertisement.js'
export default {
  components: { AdDetail, Breadcrumb },
  data() {
    return {
      ADTable: [],
      showAdDetail: false,
      showAdEdit: false,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      adObject: {},
      shelfTitle: '',
      showShelf: false,
      id: '',
      shelfStatus: '',
      showDelete: false,
      editObject: {},
      bottonList: [],
      apiUrl: ''
    }
  },
 beforeRouteEnter (to, form, next) {
   console.log(to)
    next(mv => {
      mv.getButton(mv.$store.getters.buttonRoleList, to.name)
  	})
  },
  mounted() {
    this.apiUrl = process.env.VUE_APP_BASE_API
    this.getAdvertiseList()
    console.log(process.env.VUE_APP_BASE_API, '&&&&&&&&&&&')
    console.log(this.bottonList, '@@@@@@@@@@@@@@@@@@@@@@@', this)
  },
  methods: {
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
      this.ADTable = []
      getAdvertisement(this.pageNum, this.pageSize).then(res => {
        this.total = res.info.totalrecord
        res.info.records.forEach(e => {
          e.status = e.status === 0 ? '上架' : '下架'
          this.ADTable.push(e)
        })
      }).catch(err => {
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
      this.adObject = row
      this.showAdDetail = true
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
      this.showShelf = true
      this.shelfTitle = row.status === '下架' ? '上架' : '下架'
      this.shelfStatus = row.status === '下架' ? 0 : 1
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
    handleStick(index, row) {
      console.log(index, row)
    },
    getButton(list, name) {
      list.forEach(item => {
        if (item.name === name) {
          this.bottonList = item.checkList
        }
      })
      console.log(this.bottonList)
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
</style>
