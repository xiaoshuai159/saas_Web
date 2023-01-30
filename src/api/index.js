//将四个模块请求的接口函数统一暴露
import * as trademark from './product/tradeMark'
import * as attr from './product/attr'
import * as attackData from './getChartsData/attackData'
import * as harmData from './getChartsData/harmData'
export default{
    trademark,
    attr,
    attackData,
    harmData
}