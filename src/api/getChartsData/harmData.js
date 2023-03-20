import request from '@/utils/request'
export const reqHarmData = (date)=>request({url:'/harmData',method:'post',data:{date:date}})