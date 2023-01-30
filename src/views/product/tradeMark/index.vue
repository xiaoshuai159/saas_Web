<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0px" @click="showDialog">添加</el-button>
    <el-table style="width:100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      
      <el-table-column prop="prop" label="品牌LOGO" width="width">
        <!-- 作用域插槽：数据在远方，但数据生成的结构需要这里来决定 -->
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" alt="" style="width:100px;height:60px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:20px; textAlign:center;"
      :current-page="page"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      @current-change="getPageList"
      @size-change="handleSizeChange"
      layout=" prev, pager, next, jumper, ->,sizes,total"
      :total="total">
    </el-pagination>
    <!-- :visible.sync：控制对话框显示与隐藏用的 -->
    <el-dialog :title='tmForm.id?"修改品牌":"添加品牌"' :visible.sync="dialogFormVisible">
      <el-form style="width:80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- -->
          <el-upload
            class="avatar-uploader"
            action="/two/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload" 
            >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>  
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name:'tradeMark',
    data(){
      return{
        page:1,
        limit:3,
        total:0,
        list:[],
        dialogFormVisible:false,
        // imgUrl:'',
        tmForm:{
          tmName:'',
          logoUrl:''
        },
        rules:{
          tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
          ],
          logoUrl: [
            { required: true, message: '请选择品牌图片' }
          ],
        }
      }
    },
    mounted(){
      this.getPageList()
    },
    methods:{
      showDialog(){
        this.dialogFormVisible = true
        this.tmForm = {tmName:'',logoUrl:''}
      },
      updateTradeMark(row){
        this.dialogFormVisible = true
        // console.log(row);
        this.tmForm = {...row}
      },
      //图片上传成功 
      handleAvatarSuccess(res, file) {
        // this.imgUrl = URL.createObjectURL(file.raw);
        this.tmForm.logoUrl = res.data
      },
      //图片上传之前
      beforeAvatarUpload(file) {
        // console.log(file.type)
        const isJPG = file.type === 'image/jpeg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      async getPageList(pager=1){
        //解构出参数
        this.page = pager
        const {page,limit} = this
        let result = await this.$API.trademark.reqTradeMarkList(page,limit)
        console.log(result);
        if(result.code==200){
          this.total = result.data.total
          this.list = result.data.records
        }
      },
      handleSizeChange(limit){
        this.limit = limit
        this.getPageList()
      },
      addOrUpdateTradeMark(){
        // this.dialogFormVisible = false
        // let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
        // console.log(result);
        // if(result.code == 200){
        //   this.$message.success(this.tmForm.id?"修改品牌成功":"添加品牌成功")
        //   this.getPageList(this.tmForm.id?this.page:1)
        // }
        this.$refs.ruleForm.validate(async(success)=>{
          if(success){
            this.dialogFormVisible = false
            let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
            if(result.code == 200){
              this.$message.success(this.tmForm.id?"修改品牌成功":"添加品牌成功")
              this.getPageList(this.tmForm.id?this.page:1)
            }
          }else{
            console.log('error submit!');
            return false
          }
        })
      },
      deleteTradeMark(row){
        this.$confirm(`你确定要删除${row.tmName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const result = await this.$API.trademark.reqDeleteTradeMark(row.id)
          if(result.code == 200){
            this.$message({
            type: 'success',
            message: '删除成功!'
          }); 
          this.getPageList(this.list.length>1?this.page:this.page-1)
          }
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
      }
    
}
</script>


<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
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
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
