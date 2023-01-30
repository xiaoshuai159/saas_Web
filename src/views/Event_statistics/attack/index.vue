<template>
    <div>
        <section class="statistic-header">恶意攻击统计</section>
        <section class="statistic-body">
            <el-row>
                <el-col :span="12">
                    <el-table
                        :data="tableData"
                        border
                        stripe
                        class="tableClass"
                        size="mini"
                        style="width:92%">
                        <el-table-column
                        prop="attackIP"
                        label="攻击IP"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="operator"
                        label="运营商/组织"
                        min-width="110">
                        </el-table-column>
                        <el-table-column
                        prop="geography"
                        label="地理分布"
                        min-width="100">
                        </el-table-column>
                        <el-table-column
                        prop="tool"
                        label="攻击手段"
                        min-width="108">
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="12" >
                  <el-card class="box-card" shadow="never" >
                    <div slot="header" class="clearfix">
                      <span style="line-height: 28px;">恶意IP统计</span>
                      <el-radio-group v-model="mouthOrweekOrday" style="float: right;" size="mini">
                        <el-radio-button :label="1">按日</el-radio-button>
                        <el-radio-button :label="2">按周</el-radio-button>
                        <el-radio-button :label="3">按月</el-radio-button>
                      </el-radio-group>
                    </div>
                    <div ref="chart" :style="{ width: '100%', height: '277px'}"></div>
                  </el-card>                    
                </el-col>
            </el-row>
            <el-row style="margin:15px 0">
                <el-col :span="12">
                  <el-card class="box-card2" shadow="never" style="width:92%">
                    <div slot="header" class="clearfix">
                      <span style="line-height: 28px;">恶意IP分布</span>
                      <el-radio-group v-model="mouthOrweekOrday" style="float: right;" size="mini">
                        <el-radio-button :label="1">按日</el-radio-button>
                        <el-radio-button :label="2">按周</el-radio-button>
                        <el-radio-button :label="3">按月</el-radio-button>
                      </el-radio-group>
                    </div>
                    <div ref="chart2" :style="{ width: '92%', height: '277px'}"></div>
                  </el-card>                    
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card" shadow="never" >
                    <div slot="header" class="clearfix">
                      <span style="line-height: 28px;">攻击类别统计</span>
                      <el-radio-group v-model="mouthOrweekOrday" style="float: right;" size="mini">
                        <el-radio-button :label="1">按日</el-radio-button>
                        <el-radio-button :label="2">按周</el-radio-button>
                        <el-radio-button :label="3">按月</el-radio-button>
                      </el-radio-group>
                    </div>
                    <div ref="chart3" :style="{ width: '100%', height: '277px'}"></div>
                  </el-card>                    
                </el-col>
            </el-row>
            <el-row>    
                <el-col :span="24">
                  <el-card class="box-card3" shadow="never" >
                    <div slot="header" class="clearfix">
                      <span style="line-height: 28px;">攻击趋势分析</span>
                      <el-radio-group v-model="mouthOrweekOrday" style="float: right;" size="mini">
                        <el-radio-button :label="1">按日</el-radio-button>
                        <el-radio-button :label="2">按周</el-radio-button>
                        <el-radio-button :label="3">按月</el-radio-button>
                      </el-radio-group>
                    </div>
                    <div ref="chart4" :style="{ width: '100%', height: '277px'}"></div>
                  </el-card>
                </el-col>                
            </el-row>
        </section>
    </div>
</template>

<script>
// import resize from '../mixins/resize'
export default {
    name:'Attack',
    // mixins: [resize],
    data() {
      return {
        myChart:null,
        myChart2:null,
        myChart3:null,
        myChart4:null,
        mouthOrweekOrday:1,
        tableData: [{
          attackIP: '172.31.0.202',
          operator: '海莲花',
          geography: '美国',
          tool:'APT'
        },{
          attackIP: '172.31.0.79',
          operator: 'APT29',
          geography: '印度',
          tool:'木马'
        },
        {
          attackIP: '172.31.0.162',
          operator: '双尾蝎',
          geography: '美国',
          tool:'APT'
        },
        {
          attackIP: '172.31.0.162',
          operator: '双尾蝎',
          geography: '美国',
          tool:'APT'
        },
        {
          attackIP: '172.31.0.162',
          operator: '双尾蝎',
          geography: '美国',
          tool:'APT'
        },
        {
          attackIP: '172.31.0.162',
          operator: '双尾蝎',
          geography: '美国',
          tool:'APT'
        },
        {
          attackIP: '172.31.0.162',
          operator: '双尾蝎',
          geography: '美国',
          tool:'APT'
        },
        {
          attackIP: '172.31.0.162',
          operator: '双尾蝎',
          geography: '美国',
          tool:'APT'
        },
        {
          attackIP: '172.31.0.162',
          operator: '双尾蝎',
          geography: '美国',
          tool:'APT'
        },
        {
          attackIP: '172.31.0.162',
          operator: '双尾蝎',
          geography: '美国',
          tool:'APT'
        },]
        
      }
    },
    mounted(){
      this.initCharts()
      this.initCharts2()
      this.initCharts3()
      this.initCharts4()
      window.addEventListener("resize", this.screenAdapter);
    },
    destroyed() {
      window.removeEventListener("resize", this.screenAdapter);
    },
    methods:{
      screenAdapter(){
        this.myChart.resize();
        this.myChart2.resize();
        this.myChart3.resize();
        this.myChart4.resize();
      },
      //给一个形参，接收要展示的数据
      initCharts(chartData){
        //const yData = Object.keys(chartData)
        //const seriesData = Object.values(chartData)
        this.myChart = this.$echarts.init(this.$refs.chart);
        let option = {
          
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {},
          grid: {
            top:'4%',
            left: '3%',
            right: '4%',
            bottom:'1%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['172.31.0.202', '172.31.0.79', '172.31.54.132', '172.31.198.92', '172.31.0.116', '172.31.234.32','172.31.0.62','172.31.0.179','172.31.0.84','172.31.0.253',]
          },
          series: [
            {              
              type: 'bar',
              data: [52,96,176,242,296,344,497,803,899,1820]
            }
          ]
        }
        option && this.myChart.setOption(option);
        this.myChart.resize();
      },
      initCharts2(chartData){
        //const xData = Object.keys(chartData)
        //const seriesData = Object.values(chartData)
        this.myChart2 = this.$echarts.init(this.$refs.chart2);
        let option = {
          xAxis: {
            type: 'category',
            data: ['美国', '日本', '韩国', '朝鲜', '加拿大']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [200, 150, 80, 70, 45],
              type: 'bar'
            }
          ],
          grid: {
            top:'8%',
            left: '6%',
            right: '3%',
            bottom:'3%',
            containLabel: true
          },
        }
        option && this.myChart2.setOption(option);
        this.myChart2.resize();
      },
      initCharts3(chartData){
        //const seriesData = chartData
        this.myChart3=this.$echarts.init(this.$refs.chart3);
        let option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: '4%'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '60%',
              center:['53%','50%'],
              data: [
                { value: 1048, name: 'APT' },
                { value: 735, name: '漏洞' },
                { value: 580, name: '木马' },
                { value: 484, name: '僵尸' },
                { value: 300, name: '其他' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        option && this.myChart3.setOption(option);
        this.myChart3.resize();
      },
      initCharts4(chartData){
        // chartData格式：{{'APT':{'day1':120},{'day2':100},{'day3':80}...},{'木马':{'day1':50},{'day2':38}...}}
        this.myChart4=this.$echarts.init(this.$refs.chart4);
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['APT', '木马', '漏洞', '僵尸']
          },
          
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'APT',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '木马',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '漏洞',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '僵尸',
              type: 'line',
              stack: 'Total',
              label: {
                show: true,
                position: 'top'
              },
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [320, 332, 301, 334, 390, 330, 320]
            }
          ]
        };
        option && this.myChart4.setOption(option);
        this.myChart4.resize();
      },
    },
    watch:{
      "mouthOrweekOrday":{
        handler(newValue) {
          // console.log(newValue)
          if(newValue===1){
            console.log('我选择的是日');
            //1.发请求获取数据
            //const attackData = await this.$API.attackData.reqAttackData(date)
            //2.将获取到的数据渲染到图表上 删掉mounted内的 this.initChart()
            //this.initChart(attackData)
          }else if(newValue===2){
            console.log('我选择的是周');
            //1.发请求获取数据
            //const attackData = await this.$API.attackData.reqAttackData(date)
            //2.将获取到的数据渲染到图表上
            //this.initChart(attackData)
          }else{
            console.log('我选择的是月');
            //1.发请求获取数据
            //const attackData = await this.$API.attackData.reqAttackData(date)
            //2.将获取到的数据渲染到图表上
            //this.initChart(attackData)
          }
        },
        immediate: true
      }
    }
}
</script>
<style lang="less" scoped>
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
/deep/.el-card__header{
  padding:8px 20px
}
/deep/.el-card__body{
  padding:0
}
/deep/.el-table--mini td, .el-table--mini th {
    padding: 4px 0;
}
</style>
<style>
.app-main {
    padding: 8px 50px;
}
.statistic-header{
    margin-top: 10px;
    margin-bottom: 15px;
}
.text {
    font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  /* width: 520px; */
  width:100%;
  border-radius: 0px;
}
.box-card2 {
  /* width: 438.5px; */
  width:100%;
  border-radius: 0px;
}
.box-card3 {
  /* width: 996px; */
  width:100%;
  border-radius: 0px;
}
</style>