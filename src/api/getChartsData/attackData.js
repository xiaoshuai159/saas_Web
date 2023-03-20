import request from '@/utils/request'
export const reqAttackData = (date)=>request({url:'/attackData',method:'post',data:{date:date}})