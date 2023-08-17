<template>
  <div class="content" ref="num_ref">
    <el-card shadow="never">
      <el-header
        style="
          text-align: left;
          height: 15px;
          margin-bottom: -18px;
          font-size: 16px;
          margin-top: -5px;
        "
      >
        事件数量排名
      </el-header>
      <el-main style="background-color: white">
        <el-table
          ref="tableClass"
          v-loading="loading"
          stripe
          border
          :data="tableData"
          style="width: 100%; margin-top: 20px; margin-bottom: -15px"
          class="tableClass"
          :default-sort="{ prop: 'num', order: 'descending' }"
          size="small"
        >
          <el-table-column type="index" label="排名" width="85">
            <template slot-scope="scope">
              <!-- :index="indexMethod" -->
              <div v-if="scope.row.province">
                {{ scope.$index + 1 }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="province" label="城市" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="num" label="事件数量"> </el-table-column>
        </el-table>
      </el-main>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [
      {
    "province": "福州市",
    "num": 9
  },
  {
    "province": "泉州市",
    "num": 6
  },
  {
    "province": "漳州市",
    "num": 5
  },
  {
    "province": "厦门市",
    "num": 4
  },
  {
    "province": "三明市",
    "num": 2
  },
  {
    "province": "南平市",
    "num": 2
  },
  {
    "province": "莆田市",
    "num": 2
  },
  {
    "province": "宁德市",
    "num": 1
  },
  {
    "province": "龙岩市",
    "num": 1
  }
      ],
      unit_length: "",

      loading: false,
      currentTime: this.$store.state.currentTime,
    };
  },
  methods: {
    changeTime(data1) {
      this.loading = true;
      if (
        this.$store.state.province == "北京市" ||
        this.$store.state.province == "上海市" ||
        this.$store.state.province == "重庆市" ||
        this.$store.state.province == "天津市"
      ) {
        axios({
          method:"post",
          url:"/simple_unit_data",
          data:{
            s_time: data1[0],
            e_time: data1[1],
            data: [
              this.$store.state.province ||
                this.$store.state.userinfo.province ||
                "",
              this.$store.state.province ||
                this.$store.state.userinfo.city ||
                "",
              this.$store.state.userinfo.district || "",
              this.$store.state.userinfo.adcode || "",
            ],
          },
          headers:{
            'X-CSRFToken':this.$store.state.token
          }
        }).then((rep) => {
            this.unit_length = rep.data.length;
            axios({
              method:"post",
              url:"/simple_event_data",
              data:{
                s_time: data1[0],
                e_time: data1[1],
                data: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.province ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.userinfo.district || "",
                  this.$store.state.userinfo.adcode || "",
                ],
              },
              headers:{
                'X-CSRFToken':this.$store.state.token
              }
            }).then((rep) => {
                if (rep.data.length < this.unit_length) {
                  for (
                    var i = 0;
                    i < this.unit_length + 1 - rep.data.length;
                    i++
                  ) {
                    rep.data.push({ num: "", province: "" });
                  }
                }
                this.tableData = rep.data;
                this.loading = false;
              }).catch(() => {
          //console.log(err)
            window.sessionStorage.clear();
            this.$store.dispatch("updateuserinfo", []);
            this.$router.replace("/");
            //触发后禁止浏览器的后退键
            history.pushState(null, null, document.URL);
            window.addEventListener(
              "popstate",
              function (e) {
                history.pushState(null, null, document.URL);
              },
              false
            );
        });
          });
      } else {
        axios({
        method:"post",
        url:"/simple_unit_data",
        data:{
            s_time: data1[0],
            e_time: data1[1],
            data: [
              this.$store.state.province ||
                this.$store.state.userinfo.province ||
                "",
              this.$store.state.userinfo.city || "",
              this.$store.state.userinfo.district || "",
              this.$store.state.userinfo.adcode || "",
            ],
          },
        headers:{
          'X-CSRFToken':this.$store.state.token
        }
      }).then((rep) => {
            this.unit_length = rep.data.length;
            axios({
              method:"post",
              url:"/simple_event_data",
              data:{
                s_time: data1[0],
                e_time: data1[1],
                data: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.userinfo.city || "",
                  this.$store.state.userinfo.district || "",
                  this.$store.state.userinfo.adcode || "",
                ],
              },
              headers:{
                'X-CSRFToken':this.$store.state.token
              }
            }).then((rep) => {
                if (rep.data.length < this.unit_length) {
                  for (
                    var i = 0;
                    i < this.unit_length + 1 - rep.data.length;
                    i++
                  ) {
                    rep.data.push({ num: "", province: "" });
                  }
                }
                this.tableData = rep.data;
                this.loading = false;
              }).catch(() => {
          //console.log(err)
            window.sessionStorage.clear();
            this.$store.dispatch("updateuserinfo", []);
            this.$router.replace("/");
            //触发后禁止浏览器的后退键
            history.pushState(null, null, document.URL);
            window.addEventListener(
              "popstate",
              function (e) {
                history.pushState(null, null, document.URL);
              },
              false
            );
        });
          });
      }
    },
  },
  // created(){
  //   // this.changeTime(this.currentTime)
  //   this.$store.dispatch('updatecompareip')
  // },
  // beforeMount(){

  // },
  mounted() {
    // console.log("num2运行了")
    // this.$store.dispatch('updatecompareip')
    // this.$nextTick(() => {
    //   this.changeTime(this.currentTime);
    // });
  },
  watch: {
    "$store.state.currentTime": {
      handler(newValue) {
        //console.log(newValue)
        this.changeTime(newValue);
      },
    },
  },
};
</script>

<style>
.el-table__header {
  padding: 0;
  line-height: 16px;
}
.el-table .el-table__cell {
  padding: 11px 0;
}
.tableClass .cell {
  height: 14px;
  line-height: 14px !important;
}
</style>