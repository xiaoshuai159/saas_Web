<template>
  <div>
    <el-card style="margin:5px 0 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addAttr" >添加属性</el-button>
        <el-table style="width:100%" border :data="attrList">
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="attrName" label="属性名称" width="150">          
        </el-table-column>
        <el-table-column prop="prop" label="属性值列表" width="width">
          <template slot-scope="{row,$index}">
            <el-tag type="success" v-for="(attrValue,index) in row.attrValueList" :key="attrValue.id"
              style="margin:0px 20px">{{attrValue.valueName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="150">
          <template slot-scope="{row,$index}">
            <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
            
            <el-popconfirm title="这是一段内容确定删除吗？">
              <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      </div>      
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
            
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
        <el-table style="width:100%;margin:20px 0px" border :data="attrInfo.attrValueList">
          <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{row,$index}">
            <el-input placeholder="请输入属性名" v-model="row.valueName" size="mini" v-if="row.flag" :ref="$index" @blur="toLook(row)" @keyup.native.enter="toLook(row)"></el-input>
            <span v-else @click="toEdit(row,$index)" style="display:block">{{row.valueName}}</span>
          </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-popconfirm :title="`确定删除${row.valueName}?`" @onConfirm="deleteAttrValue($index)">
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addorUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
      </div>
    </el-card>

  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "Attr",
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: '',
      isShowTable:true,
      attrInfo:{
        attrName:"",
        attrValueList:[
          // {
          //   attrId:0,
          //   valueName:"",
          // }
        ],
        categoryId:0,
        categoryLevel:3
      }
    }
  },
  methods: {
    addAttr(){
      this.isShowTable=false
      this.attrInfo={
        attrName:"",
        attrValueList:[
        ],
        categoryId:this.category3Id,
        categoryLevel:3
      }
    },
    addAttrValue(){
      this.attrInfo.attrValueList.push({
        attrId:this.attrInfo.id,
        valueName:'',
        flag:true
      })
      this.$nextTick(()=>{
        this.$refs[this.attrInfo.attrValueList.length-1].focus()
      })
    },
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId
      } else if (level == 2) {
        this.category2Id = categoryId
      } else {
        this.category3Id = categoryId
        this.getAttrList()
      }
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id)
      // console.log(result);
      if (result.code == 200) {
        this.attrList = result.data
      }
    },
    updateAttr(row){
      this.isShowTable = false
      //由于数据结构当中存在对象里面嵌套数组，数组里面有对象，因此需要使用深拷贝解决这类问题
      //深拷贝，浅拷贝在面试中出现频率很高，切记要手写深拷贝与浅拷贝
      console.log(row);
      this.attrInfo = cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item=>{
        //Vue无法探测普通的新增property，直接push的属性并非响应式属性
        this.$set(item,'flag',false)
      })
    },
    toLook(row){
      if(row.valueName.trim()==""){ this.$message('请输入一个正常的属性值'); return;}
      let isRepat = this.attrInfo.attrValueList.some((item)=>{
        if(row!==item){return row.valueName==item.valueName}
      })
      if(isRepat) return
      row.flag = false
    },
    toEdit(row,index){
      row.flag=true
      this.$nextTick(()=>{
        this.$refs[index].focus()
      })
    },
    deleteAttrValue(index){
      this.attrInfo.attrValueList.splice(index,1)
    },
    async addorUpdateAttr(){
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
        if(item.valueName!=''){
          delete item.flag
          return true
        }
      })
      try{
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.isShowTable = true
        this.$message({type:'success',message:'保存成功'})
        this.getAttrList()
      }catch(error){

      }
    }
  }
}
</script>

<style>

</style>