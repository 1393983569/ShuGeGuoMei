<template>
  <div class="body-margin" style="display:float;">
    <el-button style="float:right;margin-bottom:10px;" type="primary" @click="handleRelease">广告发布</el-button>
    <el-table :data="ADTable" center stripe>
      <el-table-column prop="createTime" label="发布时间" />
      <el-table-column prop="tile" label="标题" />
      <el-table-column prop="picture" label="轮播图" width="300px">
        <template>
          <el-carousel height="150px" style="background-color:red;">
            <el-carousel-item v-for="item in 3" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="上下架状态" />
      <el-table-column prop="operate" :width="460" label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="handleDetail(scope.row)">查看详情</el-button>
          <el-button size="mini" type="success" @click="handleStick(scope.$index, scope.row)">顶置</el-button>
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="success" size="mini" @click="putawayHandle(scope.row)">{{ state = scope.row.status === "上架" ? '下架': '上架' }}</el-button>
          <el-button type="danger" size="mini" @click="deleteHandle(scope.row)">删除</el-button>
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
    <!-- 上架/下架 -->
    <el-dialog :visible.sync="showDelete" center width="380px" title="删除广告">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否删除该条广告？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showDelete = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;" @click="deleteAdConfirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 广告详情 -->
    <ad-detail :show-ad-detail="showAdDetail" :ad-object="adObject" @handleClose="handleClose" />
    <!-- 广告编辑 -->
    <ad-edit :show-ad-edit="showAdEdit" @closeEdit="closeEdit" />
  </div>
</template>
<script>
import AdDetail from './ADDetail.vue'
import AdEdit from './AdEdit.vue'
import { getAdvertisement, shelfAdvertisement, deleteAdvertisement } from '@/api/advertisement.js'
export default {
  components: { AdDetail, AdEdit },
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
      showDelete: false
    }
  },
  mounted() {
    this.getAdvertiseList()
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
      this.showAdEdit = true
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
