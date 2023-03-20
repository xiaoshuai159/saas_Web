<template>
    <div>
        <section class="statistic-header">恶意攻击统计</section>
        <section class="statistic-body">
            <el-row>
                <el-col :span="12">
                    <el-table
                        v-loading="loading1"
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
                        label="攻击类型"
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
                    <div ref="chart" :style="{ width: '100%', height: '277px'}" v-loading="loading2"></div>
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
                    <div ref="chart2" :style="{ width: '92%', height: '277px'}" v-loading="loading3"></div>
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
                    <div ref="chart3" :style="{ width: '100%', height: '277px'}" v-loading="loading4"></div>
                  </el-card>                    
                </el-col>
            </el-row>
            <el-row>    
                <el-col :span="24">
                  <el-card class="box-card3" shadow="never" >
                    <div slot="header" class="clearfix">
                      <span style="line-height: 28px;">攻击趋势分析</span>
                      <el-radio-group v-model="yearOrmouthOrweek" style="float: right;" size="mini">                        
                        <el-radio-button :label="2">按周</el-radio-button>
                        <el-radio-button :label="3">按月</el-radio-button>
                        <el-radio-button :label="4">按年</el-radio-button>
                      </el-radio-group>
                    </div>
                    <div ref="chart4" :style="{ width: '100%', height: '277px'}" v-loading="loading5"></div>
                  </el-card>
                </el-col>                
            </el-row>
        </section>
    </div>
</template>

<script>
import { debounce } from '@/utils'
export default {
    name:'Attack',
    // mixins: [resize],
    data() {
      return {
        loading1:false,
        loading2:false,
        loading3:false,
        loading4:false,
        loading5:false,
        $_sidebarElm: null,
        $_resizeHandler: null,
        myChart:null,
        myChart2:null,
        myChart3:null,
        myChart4:null,
        mouthOrweekOrday:2,
        yearOrmouthOrweek:2,
        //tableData格式[{},{},...]
        tableData: []        
      }
    },
    mounted(){
      this.initListener()
    },
    activated() {
      if (!this.$_resizeHandler) {
        // avoid duplication init
        this.initListener()
      }
      // when keep-alive chart activated, auto resize
      this.resize()
    },
    beforeDestroy() {
      this.destroyListener()
    },
    deactivated() {
      this.destroyListener()
    },
    // destroyed() {
    //   window.removeEventListener("resize", this.screenAdapter);
    // },
    methods:{
      screenAdapter(){
        this.myChart.resize();
        this.myChart2.resize();
        this.myChart3.resize();
        this.myChart4.resize();
      },
      //给一个形参，接收要展示的数据
      //chartData接收数据格式：[{ip:'191.113.15.62',value:65},{ip:'191.113.15.63',value:6},...]
      //chart1数据格式：yAxis:{data:[]}，series:[{data:[]}]
      initCharts(chartData){
        const yData = []
        const seriesData = []
        //const yData = Object.keys(chartData)
        //const seriesData = Object.values(chartData)
        chartData.data.IPstatistics.map((item,index,arr)=>{
          yData.push(item.ip);
          seriesData.push(item.value)
        })
        if(this.myChart != null&&this.myChart != ''&&this.myChart != undefined){
          this.myChart.dispose()
        }
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
            data: yData.reverse()
          },
          series: [
            {              
              type: 'bar',
              data: seriesData.reverse()
            }
          ]
        }
        option && this.myChart.setOption(option);
        this.myChart.resize();
      },
      //chartData接收数据格式：[{area:'美国',value:65},{area:'日本',value:6},...]
      //chart2数据格式：xAxis:{data:[]}，series:[{data:[]}]
      initCharts2(chartData){
        const xData = []
        const seriesData = []
        //const xData = Object.keys(chartData)
        //const seriesData = Object.values(chartData)
        chartData.data.IPdistribution.map((item,index,arr)=>{
          xData.push(item.area);
          seriesData.push(item.value)
        })
        if(this.myChart2 != null&&this.myChart2 != ''&&this.myChart2 != undefined){
          this.myChart2.dispose()
        }
        this.myChart2 = this.$echarts.init(this.$refs.chart2);
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              
            },
            
          },
          xAxis: {
            type: 'category',
            data: xData,
            axisLabel: { interval: 0, rotate: 30 }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: seriesData,
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
      //chartData接收数据格式：[{name: 'APT',value:65},{name: '漏洞',value:6},...]
      //chart3数据格式：series:[{value:...,name:...},{}...]
      initCharts3(chartData){
        if(this.myChart3 != null&&this.myChart3 != ''&&this.myChart3 != undefined){
          this.myChart3.dispose()
        }
        this.myChart3=this.$echarts.init(this.$refs.chart3);
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b} : <strong>{c}</strong>',
          },
          legend: {
            orient: 'vertical',
            left: '4%'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '55%',
              center:['68%','50%'],
              data: chartData.data.category,
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
      //chartData接收数据格式：[{name: 'APT',data:[120, 132, 101, 134, 90, 230, 210],{name:'木马',data:[220, 182, 191, 234, 290, 330, 310]},{},...]
      //chart4数据格式：legend:{data:['APT', '木马', '漏洞']},xAxis:[{data:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}],
      //               series:[{name: 'APT',data:[120, 132, 101, 134, 90, 230, 210],{name:'木马',data:[220, 182, 191, 234, 290, 330, 310]},{},...]
      initCharts4(chartData){
        const legend = []
        const seriesData = []
        const optionSeries = []
        const xAxisData = []
        chartData.data.trend.map((item,index,arr)=>{
          legend.push(item.name);
          xAxisData.push(item.date)
        })
        let legend2 = [...new Set(legend)]      // ['未知','医药','政府','学校']
        let xAxisData2 = [...new Set(xAxisData)]
        for (let i=0;i<legend2.length;i++){
            // console.log(legend2[i]);
            seriesData[i] = []
            for(let j=0;j<chartData.data.trend.length;j++){
                if(legend2[i]==chartData.data.trend[j].name){
                    // console.log(chartData.data.trend[j].value); 
                    seriesData[i].push(chartData.data.trend[j].value)
                }
            }
        }
        let seriesData2 = seriesData.reverse()
        let seriesData3 = []
        // console.log("seriesData2",seriesData2);
        for (let i=0; i<seriesData2.length;i++){
          // seriesData3[i] = []
          let newseriesData2 = seriesData2[i].reverse();
          seriesData3.push(newseriesData2)
        }
        for (let i=0; i<legend.length; i++){
          optionSeries.push({
              name: legend2[i],
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: seriesData3[legend2.length-i-1]
          })
        }
        if(this.myChart4 != null&&this.myChart4 != ''&&this.myChart4 != undefined){
          this.myChart4.dispose()
        }
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
            data: legend
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
              data: xAxisData2.reverse()
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: optionSeries
        };
        option && this.myChart4.setOption(option);
        this.myChart4.resize();
      },
      $_sidebarResizeHandler(e) {
        if (e.propertyName === 'width') {
          this.$_resizeHandler()
        }
      },
      initListener() {
        this.$_resizeHandler = debounce(() => {
          this.resize()
        }, 100)
        window.addEventListener('resize', this.$_resizeHandler)

        this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
        this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
      },
      destroyListener() {
        window.removeEventListener('resize', this.$_resizeHandler)
        this.$_resizeHandler = null

        this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
      },
      resize() {
          this.myChart.resize();
          this.myChart2.resize();
          this.myChart3.resize();
          this.myChart4.resize();
      }
  
    },
    watch:{
      // "$store.state.isActive":{
      //   handler(newValue){
      //     this.screenAdapter()
      //   },
      // },
      "mouthOrweekOrday":{
        async handler(newValue) {
          this.loading1 = true
          this.loading2 = true
          this.loading3 = true
          this.loading4 = true
          if(newValue===1){
            console.log('我选择的是日');
            //1.发请求获取数据  day  chartData4每段3h 分8段
            const attackData = await this.$API.attackData.reqAttackData('day')
            //2.将获取到的数据渲染到图表上 删掉mounted内的 this.initChart()
            this.tableData = attackData.data.tableData
            this.initCharts(attackData)
            this.initCharts2(attackData)
            this.initCharts3(attackData)
            this.loading1 = false
            this.loading2 = false
            this.loading3 = false
            this.loading4 = false
          }else if(newValue===2){
            this.loading5 = true
            console.log('我选择的是周');
            this.yearOrmouthOrweek = newValue
            //1.发请求获取数据  week  chartData4每段1天 分7段
            const attackData = await this.$API.attackData.reqAttackData('week')
            //2.将获取到的数据渲染到图表上
            // this.initChart(attackData)
            this.tableData = attackData.data.tableData
            this.initCharts(attackData)
            this.initCharts2(attackData)
            this.initCharts3(attackData)
            this.initCharts4(attackData)
            this.loading1 = false
            this.loading2 = false
            this.loading3 = false
            this.loading4 = false
            this.loading5 = false
          }else if(newValue===3){
            console.log('我选择的是月');
            this.loading5 = true
            this.yearOrmouthOrweek = newValue
            //1.发请求获取数据  month  chartData4每段3天 分10段
            const attackData = await this.$API.attackData.reqAttackData('month')
            //2.将获取到的数据渲染到图表上
            // this.initChart(attackData)
            this.tableData = attackData.data.tableData
            this.initCharts(attackData)
            this.initCharts2(attackData)
            this.initCharts3(attackData)
            this.initCharts4(attackData)
            this.loading1 = false
            this.loading2 = false
            this.loading3 = false
            this.loading4 = false
            this.loading5 = false
          }
        },
        immediate: true
      },
      "yearOrmouthOrweek":{
        async handler(newValue) {
          // console.log(newValue)
          if(newValue===2){
            this.mouthOrweekOrday = newValue
          }else if(newValue===3){
            this.mouthOrweekOrday = newValue
          }else if(newValue===4){
            console.log('我选择的是年');
            // this.loading5 = true
            //1.发请求获取数据  month  chartData4每段3天 分10段
            const attackData = await this.$API.attackData.reqAttackData('year')
            //2.将获取到的数据渲染到图表上
            // this.initChart(attackData)
            this.tableData = attackData.data.tableData
            this.initCharts4(attackData)
            this.loading1 = false
            this.loading5 = false
          }
        },
        immediate: true
      },
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