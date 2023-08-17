<template>
  <div class="content" ref="xiangqing_ref">
    <el-card shadow="never">
      <el-main style="background-color: white">
        <el-row :gutter="20" style="margin-bottom: 25px; margin-top: -12px">
          <el-col :span="4"
            ><div
              class="grid-content bg-purple"
              style="font-size: 16px;"
            >
              事件详情
            </div></el-col
          >
          <el-col :span="20"
            ><div class="grid-content bg-purple">
              <div align="left">
                省份 <span v-html="'\u00a0\u00a0\u00a0\u00a0'"></span>&nbsp;&nbsp;&nbsp;&nbsp;
                <el-select
                  v-model="searchValue.value"
                  clearable
                  filterable
                  placeholder="请选择"
                  ref="selectLable1"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option> </el-select
                ><span v-html="'\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 事件类型
                <span v-html="'\u00a0\u00a0'"></span>&nbsp;&nbsp;<el-select
                  v-model="searchValue.value2"
                  clearable
                  placeholder="请选择"
                  ref="selectLable2"
                >
                  <el-option
                    v-for="item in options2"
                    :key="'new1' + item.value2"
                    :label="item.label2"
                    :value="item.value2"
                  >
                  </el-option> </el-select
                ><span v-html="'\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 单位类型
                <span v-html="'\u00a0\u00a0\u00a0'"></span>&nbsp;&nbsp;<el-select
                  v-model="searchValue.value3"
                  clearable
                  placeholder="请选择"
                  ref="selectLable3"
                >
                  <el-option
                    v-for="item in options3"
                    :key="'new2' + item.value3"
                    :label="item.label3"
                    :value="item.value3"
                  >
                  </el-option>
                </el-select>
              </div>
              <br />
              <div align="left">
                涉事IP <span v-html="'\u00a0'"></span>&nbsp;&nbsp;<el-input
                  v-model="searchValue.input1"
                  placeholder="单行输入"
                  style="width: 20%"
                ></el-input>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span v-html="'\u00a0 \u00a0'"></span><span v-html="'\u00a0\u00a0 '"></span>涉事单位<span v-html="'\u00a0\u00a0\u00a0\u00a0'"></span>
                <el-input
                  v-model="searchValue.input2"
                  placeholder="单行输入"  
                  style="width: 20%"
                ></el-input>
              </div>
              <div align="left">
                <el-button @click="chaxun">查询</el-button
                ><el-button @click="daochu()" :disabled="isDisabled"
                  >导出</el-button
                ><el-button
                  @click="newdaochu()"
                  :disabled="isDisabled"
                  class="newButton"
                  >最近记录导出</el-button
                >
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="block">
              <el-table
                class="tableClass"
                stripe
                border
                v-loading="loading"
                ref="multipleTable"
                :data="
                  tableData.slice(
                    (currentPage - 1) * pagesize,
                    currentPage * pagesize
                  )
                "
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="50" fixed>
                </el-table-column>
                <el-table-column label="IP" prop="_id" min-width="130" sortable>
                  <template slot-scope="scope">     
                    <span v-if="scope.row._id != ''&&$store.state.userinfo.user_level==5"> {{ numberMask(scope.row._id) }}</span>
                    <span v-else>{{ scope.row._id }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="日期" width="110" sortable>
                  <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <!-- <el-table-column
                        prop="time"
                        label="时间"
                        width="90"
                        >
                        </el-table-column> -->
                <el-table-column
                  prop="event_type"
                  label="事件类型"
                  min-width="110"
                  sortable
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="涉及城市"
                  min-width="100"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="district"
                  label="涉及地区"
                  min-width="100"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="unit_type"
                  label="涉及单位类型"
                  min-width="105"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="unit_name"
                  label="涉及单位名称"
                  min-width="200"
                  show-overflow-tooltip
                >
                
                <template slot-scope="scope">     
                    <span v-if="scope.row.unit_name != ''&&$store.state.userinfo.user_level==5"> {{ companyMask(scope.row.unit_name) }}</span>
                    <span v-else>{{ scope.row.unit_name }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="event_details"
                  label="事件详情"
                  min-width="230"
                  show-overflow-tooltip
                >
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length"
              >
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-card>
  </div>
</template>

<script>
import { Message } from "element-ui";
import axios from "axios";
import {numberMask,companyMask} from '@/utils/mask'
import {encryptRsa,encryptAes,decryptAes,randomCode} from '@/utils/aes-rsa.js'
export default {
  data() {
    this.numberMask = numberMask
    this.companyMask = companyMask  
    return {
      loading: false,
      isDisabled: false,
      percentage: 0, //进度条的占比
      currentPage: 1,
      pagesize: 10,
      searchValue: {
        value: "",
        value2: "",
        value3: "",
        input1: "",
        input2: "",
      },
      // currentTime: this.$store.state.currentTime,
      options: [
        { value: "选项1", label: "北京" },
        { value: "选项2", label: "天津" },
        { value: "选项3", label: "上海" },
        { value: "选项4", label: "重庆" },
        { value: "选项5", label: "内蒙古" },
        { value: "选项6", label: "广西" },
        { value: "选项7", label: "西藏" },
        { value: "选项8", label: "宁夏" },
        { value: "选项9", label: "新疆" },
        { value: "选项10", label: "香港" },
        { value: "选项11", label: "澳门" },
        { value: "选项12", label: "河北" },
        { value: "选项13", label: "山西" },
        { value: "选项14", label: "辽宁" },
        { value: "选项15", label: "吉林" },
        { value: "选项16", label: "黑龙江" },
        { value: "选项17", label: "江苏" },
        { value: "选项18", label: "浙江" },
        { value: "选项19", label: "安徽" },
        { value: "选项20", label: "福建" },
        { value: "选项21", label: "江西" },
        { value: "选项22", label: "山东" },
        { value: "选项23", label: "河南" },
        { value: "选项24", label: "湖北" },
        { value: "选项25", label: "湖南" },
        { value: "选项26", label: "广东" },
        { value: "选项27", label: "海南" },
        { value: "选项28", label: "四川" },
        { value: "选项29", label: "贵州" },
        { value: "选项30", label: "云南" },
        { value: "选项31", label: "陕西" },
        { value: "选项32", label: "甘肃" },
        { value: "选项33", label: "青海" },
        { value: "选项34", label: "台湾" },
      ],
      options2: [],
      options3: [],
      tableData: [
        {
          _id:'124.31.244.3',
          date:'2023/1/29',
          event_type:'数据库攻击',
          city:'昌都市',
          district:'边坝县',
          unit_type:'未知',
          unit_name:'边坝县水利局',
          event_details:'sqlserver数据库下载恶意代码'
        },
        {
          _id:'60.171.137.119',
          date:'2023/2/1',
          event_type:'数据库攻击',
          city:'安庆市',
          district:'岳西县',
          unit_type:'政府',
          unit_name:'岳西县行政服务中心',
          event_details:'sqlserver数据库下载恶意代码'
        },
        {
          _id:'112.30.214.245',
          date:'2023/2/5',
          event_type:'数据库攻击',
          city:'淮南市',
          district:'八公山区',
          unit_type:'政府',
          unit_name:'淮南市八公山区新庄孜街道办事处',
          event_details:'redis数据库下载恶意代码'
        },
        {
          _id:'111.6.121.15',
          date:'2023/2/9',
          event_type:'数据库攻击',
          city:'濮阳市',
          district:'华龙区',
          unit_type:'未知',
          unit_name:'濮阳市政务服务和大数据管理局',
          event_details:'mysql数据库下载恶意代码'
        },
        {
          _id:'203.93.212.46',
          date:'2023/2/12',
          event_type:'数据库攻击',
          city:'永州市',
          district:'零陵区',
          unit_type:'医院',
          unit_name:'永州市中心医院',
          event_details:'sqlserver数据库下载恶意代码'
        },
        {
          _id:'120.198.90.110',
          date:'2023/2/14',
          event_type:'数据库攻击',
          city:'河源市',
          district:'和平县',
          unit_type:'医院',
          unit_name:'和平中医院',
          event_details:'sqlserver数据库下载恶意代码'
        },
        {
          _id:'223.244.92.26',
          date:'2023/2/19',
          event_type:'数据库攻击',
          city:'淮南市',
          district:'田家庵区',
          unit_type:'未知',
          unit_name:'淮南市市场监督管理局',
          event_details:'mysql数据库下载恶意代码'
        },
        {
          _id:'180.139.139.132',
          date:'2023/2/21',
          event_type:'数据库攻击',
          city:'南宁市',
          district:'青秀区',
          unit_type:'医院',
          unit_name:'广西中医药大学第一附属医院',
          event_details:'redis数据库下载恶意代码'
        },
        {
          _id:'119.6.89.155',
          date:'2023/2/24',
          event_type:'数据库攻击',
          city:'成都市',
          district:'武侯区',
          unit_type:'未知',
          unit_name:'中国人民武装警察部队成都市消防支队',
          event_details:'postgresql数据库被植入后门账号'
        },
        {
          _id:'119.53.91.46',
          date:'2023/3/2',
          event_type:'数据库攻击',
          city:'长春市',
          district:'双阳区',
          unit_type:'未知',
          unit_name:'长春市双阳区结核病防治督导办公室',
          event_details:'sqlserver数据库下载恶意代码'
        },
        {
          _id:'218.106.164.68',
          date:'2023/3/4',
          event_type:'数据库攻击',
          city:'北京市',
          district:'朝阳区',
          unit_type:'政府',
          unit_name:'中国人民共和国外交部',
          event_details:'mysql数据库下载恶意代码'
          
        },
        {
          _id:'110.167.233.26',
          date:'2023/3/5',
          event_type:'数据库攻击',
          city:'西宁市',
          district:'城北区',
          unit_type:'政府',
          unit_name:'青海省高级人民法院',
          event_details:'redis数据库下载恶意代码'
        },
        {
          _id:'103.152.77.160',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'陇南市',
          district:'成县',
          unit_type:'未知',
          unit_name:'甘肃柏隆电子商务科技有限责任公司',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'117.114.138.58',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'北京市',
          district:'昌平区',
          unit_type:'未知',
          unit_name:'北京教育信息网服务中心有限公司',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'117.157.65.28',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'甘肃省',
          district:'兰州市',
          unit_type:'未知',
          unit_name:'深圳市路通网络技术有限公司',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'120.196.74.75',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'广州市',
          district:'白云区',
          unit_type:'未知',
          unit_name:'广州诚丰信知识产权有限公司',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'120.224.3.159',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'泰安市',
          district:'肥城市',
          unit_type:'未知',
          unit_name:'肥城市王瓜店街道办事处王西村民委员会',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'122.5.106.198',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'淄博市',
          district:'张店区',
          unit_type:'未知',
          unit_name:'山东通广电子有限公司',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'123.15.32.150',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'郑州市',
          district:'金水区',
          unit_type:'未知',
          unit_name:'河南省地质矿产勘查开发局第二地质环境调查院',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'153.35.193.250',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'泰州市',
          district:'海陵区',
          unit_type:'未知',
          unit_name:'飞救医疗科技(北京)有限公司',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'153.35.193.251',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'泰州市',
          district:'海陵区',
          unit_type:'未知',
          unit_name:'飞救医疗科技(北京)有限公司',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'218.200.15.148',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'渭南市',
          district:'蒲城县',
          unit_type:'未知',
          unit_name:'陕西信使科技文化有限公司',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'218.23.181.169',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'池州市',
          district:'青阳县',
          unit_type:'未知',
          unit_name:'池州百信医院',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'221.1.208.162',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'菏泽市',
          district:'单县',
          unit_type:'未知',
          unit_name:'单县人民医院',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'222.173.80.190',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'青岛市',
          district:'崂山区',
          unit_type:'未知',
          unit_name:'青岛优多共享电子商务有限公司',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'222.71.102.162',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'上海市',
          district:'徐汇区',
          unit_type:'未知',
          unit_name:'上海溧瑜工程管理咨询中心',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'223.214.194.9',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'宣城市',
          district:'',
          unit_type:'未知',
          unit_name:'宣城旌德县中医院',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'58.215.216.238',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'无锡市',
          district:'滨湖区',
          unit_type:'未知',
          unit_name:'华东理工大学',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'58.33.216.92',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'上海市',
          district:'徐汇区',
          unit_type:'未知',
          unit_name:'上海市文化和旅游局执法总队',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'60.174.228.148',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'合肥市',
          district:'蜀山区',
          unit_type:'未知',
          unit_name:'安徽索峰电力工程有限公司',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'60.214.209.188',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'东营市',
          district:'河口区',
          unit_type:'未知',
          unit_name:'东营嘉盛文化传播有限公司',
          event_details:'redis数据库未授权访问漏洞'
        },
        {
          _id:'60.216.18.86',
          date:'2023/2/3',
          event_type:'数据库未授权',
          city:'济南市',
          district:'市中区',
          unit_type:'未知',
          unit_name:'山东嘉灿文化传媒有限公司',
          event_details:'redis数据库未授权访问漏洞'
        },
        
      ],
      multipleSelection: "",
      multipleSelection_id: [],
      exportid: [],
    };
  },
  methods: {
    filterOptions2() {
      let list1 = [];
      for (var i = 0; i < this.tableData.length; i++) {
        list1.push(this.tableData[i].event_type);
      }
      let list2 = [...new Set(list1)];
      if (list2 == "") return;
      for (var i = 0; i < list2.length; i++) {
        if (list2[i] != "") {
          this.options2.push({
            value2: `2.选项${i + 1}`,
            label2: list2[i],
          });
        }
      }
    },
    filterOptions3() {
      let list1 = [];
      for (var i = 0; i < this.tableData.length; i++) {
        list1.push(this.tableData[i].unit_type);
      }
      let list2 = [...new Set(list1)];
      if (list2 == "") return;
      for (var i = 0; i < list2.length; i++) {
        if (list2[i] != "") {
          this.options3.push({
            value3: `3.选项${i + 1}`,
            label3: list2[i],
          });
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.multipleSelection_id.push(this.multipleSelection[i]._id); //记得clear
      }
      this.exportid = [];
      this.multipleSelection.forEach((item) => {
        this.exportid.push({
          s_time: this.$store.state.currentTime[0],
          e_time: this.$store.state.currentTime[1],
          _id: item._id,
          unit_name: item.unit_name,
          event_type: item.event_type,
        });
      });
      return this.multipleSelection;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      //console.log(`每页${val}条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //console.log(`当前页: ${val}`);
    },
    changeTime(data1) {
      this.loading = true;
      let ranCode = randomCode()   //AES-key
      let encryptedAES=encryptRsa(this.$store.state.RSApubkey, ranCode)
      let encryptedData = encryptAes(ranCode, {
          s_time: data1[0],
          e_time: data1[1],
          data: {
            address: [
              this.$store.state.userinfo.province || "",
              this.$store.state.userinfo.city || "",
              this.$store.state.userinfo.district || "",
              this.$store.state.userinfo.adcode || "",
            ],
            search: [
              this.$refs.selectLable1.selected.label || "",
              this.$refs.selectLable2.selected.label || "",
              this.$refs.selectLable3.selected.label || "",
              this.searchValue.input1,
              this.searchValue.input2,
            ],
          },
        })
      axios({
        method:"post",
        url:"/details",
        data:{"data": encryptedData},
        headers:{
          'X-CSRFToken':this.$store.state.token,
          'encryptedAES':encryptedAES,
        }
      })
        .then((rep) => {
          this.loading = false;
          let decryptedData = decryptAes(ranCode,rep.data).replace(/\0/g,"")   
          this.tableData= JSON.parse(decryptedData)
          //this.tableData = Array.from(decryptAes(ranCode,rep.data));
          // this.filterOptions1()
          
        });
    },
    chaxun() {
      this.loading = true;
      let ranCode = randomCode()   //AES-key
      let encryptedAES=encryptRsa(this.$store.state.RSApubkey, ranCode)
      // console.log(encryptedAES);
      let encryptedData = encryptAes(ranCode,JSON.stringify({
            s_time: this.$store.state.currentTime[0],
            e_time: this.$store.state.currentTime[1],
            data: {
              address: [
                this.$store.state.userinfo.province || "",
                this.$store.state.userinfo.city || "",
                this.$store.state.userinfo.district || "",
                this.$store.state.userinfo.adcode || "",
              ],
              search: [
                this.$refs.selectLable1.selected.label || "",
                this.$refs.selectLable2.selected.label || "",
                this.$refs.selectLable3.selected.label || "",
                this.searchValue.input1,
                this.searchValue.input2,
              ],
            },
          }))
      axios({
        method:"post",
        url:"/details",
        data:{"data": encryptedData},
        headers:{
          'X-CSRFToken':this.$store.state.token,
          'encryptedAES':encryptedAES,
        }
      })
        .then((rep) => {
          // console.log(rep.data);
          // console.log(decryptAes(ranCode,rep.data));
          this.loading = false;
          let decryptedData = decryptAes(ranCode,rep.data).replace(/\0/g,"")   
          this.tableData= JSON.parse(decryptedData)
          
        });
    },
    newdaochu(){
      this.percentage = 0;
      this.isDisabled = true;
      Message({
        message: "正在导出，请稍等。",
      });

      axios({
        method: "post",
        url: "/new",
        // params: this.exportid,
        responseType: "blob",
        headers:{
          'X-CSRFToken':this.$store.state.token
        }
      })
        .then((rep) => {
          if (rep) {
            this.exportid = [];
            let binaryData = [];
            binaryData.push(rep.data);
            const blobUrl = window.URL.createObjectURL(new Blob(binaryData));
            const a = document.createElement("a");
            a.style.display = "none";
            const disposition = rep.headers["content-disposition"];
            let fileName = disposition.substring(
              disposition.indexOf("filename=") + 9,
              disposition.length
            );
            fileName = decodeURI(escape(fileName));
            fileName = fileName.replace(/\"/g, "");
            a.download = fileName;
            a.href = blobUrl;
            a.click();
            Message({
              message: "导出完成！",
              type: "success",
            });
            this.percentage = 100;
            this.isDisabled = false;
          }
        })
        .catch((err) => {
          this.isDisabled = false;
          Message({
            message: "导出失败，请稍后再试！",
            type: "error",
          });
        });
    },
    daochu() {
      if (this.exportid.length === 0) {
        Message({
          message: "请至少选择一条需要导出的数据",
          type: "warning",
        });
        return;
      }
      this.percentage = 0;
      this.isDisabled = true;
      Message({
        message: "正在导出，请稍等。",
      });

      axios({
        method: "post",
        url: "/export_paper",
        params: this.exportid,
        responseType: "blob",
        headers:{
          'X-CSRFToken':this.$store.state.token
        }
      })
        .then((rep) => {
          if (rep) {
            this.exportid = [];
            let binaryData = [];
            binaryData.push(rep.data);
            const blobUrl = window.URL.createObjectURL(new Blob(binaryData));
            const a = document.createElement("a");
            a.style.display = "none";
            const disposition = rep.headers["content-disposition"];
            let fileName = disposition.substring(
              disposition.indexOf("filename=") + 9,
              disposition.length
            );
            // console.log(fileName)
            // iso8859-1的字符转换成中文
            fileName = decodeURI(escape(fileName));
            // console.log(fileName)
            // 去掉双引号
            fileName = fileName.replace(/\"/g, "");
            // console.log(fileName)
            a.download = fileName;
            a.href = blobUrl;
            a.click();
            Message({
              message: "导出完成！",
              type: "success",
            });
            this.percentage = 100;
            this.isDisabled = false;
          }
        })
        .catch((err) => {
          //console.log(err)
          this.isDisabled = false;
          Message({
            message: "导出失败，请稍后再试！",
            type: "error",
          });
        });
    },
    
  },
  // mounted() {
  //   // this.loading = true;  //别忘了打开
  //   let ranCode = randomCode()   //AES-key  
  //   let encryptedAES=encryptRsa(this.$store.state.RSApubkey, ranCode)
  //   // console.log('AESkey:'+ranCode);
  //   // console.log('RSApubkey:'+this.$store.state.RSApubkey);
  //   // console.log('encryptedAES:'+encryptedAES);
  //   let encryptedData = encryptAes(ranCode,JSON.stringify({
  //     s_time: this.$store.state.currentTime[0],
  //     e_time: this.$store.state.currentTime[1],
  //     data: {
  //       address: [
  //         this.$store.state.userinfo.province || "",
  //         this.$store.state.userinfo.city || "",
  //         this.$store.state.userinfo.district || "",
  //         this.$store.state.userinfo.adcode || "",
  //       ],
  //       search: [
  //         this.$refs.selectLable1.selected.label || "",
  //         this.$refs.selectLable2.selected.label || "",
  //         this.$refs.selectLable3.selected.label || "",
  //         this.searchValue.input1,
  //         this.searchValue.input2,
  //       ]
  //     },
  //   }))
  //   axios({
  //     method: "post",
  //     url: "/details",
  //     data: {"data": encryptedData},
  //     headers:{
  //       'X-CSRFToken':this.$store.state.token,
  //       'encryptedAES':encryptedAES,
  //     }
  //   }).then((rep) => {
  //     this.loading = false;
  //     let decryptedData = decryptAes(ranCode,rep.data).replace(/\0/g,"")   
  //     this.tableData= JSON.parse(decryptedData)
  //     this.filterOptions2();
  //     this.filterOptions3();
      
  //   });
  // },
  watch: {
    "$store.state.currentTime": {
      handler(newValue) {
        this.changeTime(newValue);
      },
    },
  },
};
</script>

<style scoped lang="less">
/deep/.el-select {
  width: 20%;
}
/deep/.el-input__inner {
  height: 23px;
}
/deep/.el-input__suffix {
  top: -1px;
}
/deep/.el-input__icon {
  line-height: inherit;
}
/deep/.el-button {
  line-height: 0.1;
  border-radius: 5px;
  letter-spacing: 10px;
  margin: 15px 30px -8px 0;
  padding: 12px 21px 12px 28px;
}
/deep/.el-icon-loading {
  width: 14px;
  height: 14px;
  margin-top: 14px;
}
/deep/.tableClass .cell {
  // padding-bottom: 12px;
  height: 20px;
  line-height: 20px !important;
}
/deep/.el-table .caret-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
  margin: -6px auto;
}
</style>
<style>
.newButton {
  letter-spacing: 1px !important;
  padding: 12px 21px 12px 20px !important;
}
.el-pagination{
  text-align: center;
}
</style>