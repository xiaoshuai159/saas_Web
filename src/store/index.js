import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)
const actions = {
    updateisactive(context,value){
        context.commit('updateIsActive',value)
    },
  updatecompareip(context){
      axios.post('/simple_event_data',{"s_time":state.currentTime[0],"e_time":state.currentTime[1],data:[state.province||"",state.city||"",state.area||"",state.userinfo.adcode||""]}).then((res)=>{
          context.commit('updateCompareip',res.data.length)
          console.log("store中收到post请求之后的compareip的长度"+res.data.length)
      })
      
  },
  updatecomparearea(context){
      axios.post('/simple_unit_data',{"s_time":state.currentTime[0],"e_time":state.currentTime[1],data:[state.province||"",state.city||"",state.area||"",state.userinfo.adcode||""]}).then((res)=>{
          context.commit('updateComparearea',res.data.length)
          console.log("store中收到post请求之后的comparearea的长度"+res.data.length)
      })
  },
  updatetoken(context,value){
      context.commit('updateToken',value)
  },
  updateprovince(context,value){
      context.commit('updateProvince',value)
  },
  updatecity(context,value){
      context.commit('updateCity',value)
  },
  updatearea(context,value){
      context.commit('updateArea',value)
  },
  updateuserlevel(context,value){
      context.commit('updateUserlevel',value)
  },
  updateuserinfo(context,value){
      context.commit('updateUserinfo',value)
  },
  updatecurrenttime(context,value){
      context.commit('updateCurrentTime',value)
  },
  updateareanum(context,value){
      context.commit('updateareaNum',value)
  },
  updateunitnum(context,value){
      context.commit('updateunitNum',value)
  },
  updateipnum(context,value){
      context.commit('updateIPnum',value)
  },
  updatecountrymapdata(context,value){
      context.commit('updatecountryMapData',value)
  },
  updateprovincemapdata(context,value){
      context.commit('updateprovinceMapData',value)
  },
  updatecitymapdata(context,value){
      context.commit('updatecityMapData',value)
  },
  updateareamapdata(context,value){
      context.commit('updateareaMapData',value)
  },
  updatedistrict(context,value){
      context.commit('updateDistrict',value)
  },
  updateadcode(context,value){
      context.commit('updateAdcode',value)
  },
  updateiporunit(context,value){
      context.commit('updateIPorUnit',value)
  },
  updatersapublickey(context,value){
      context.commit('updateRSApubkey',value)
  }

}
//mutations——用于操作数据(state)
const mutations = {
  updateIsActive(state,value){
    sessionStorage.setItem(`isActive`,JSON.stringify(value))
    state.isActive = value
  },
  updateRSApubkey(state,value){
      state.RSApubkey = value
  },
  updateToken(state,value){
      sessionStorage.setItem(`token`,JSON.stringify(value))
      state.token = value
  },
  updateCompareip(state,value){
      sessionStorage.setItem(`compareip`,JSON.stringify(value))
      state.compareip = value
  },
  updateComparearea(state,value){
      sessionStorage.setItem(`comparearea`,JSON.stringify(value))
      state.comparearea = value
  },
  updateDistrict(state,value){
      sessionStorage.setItem(`district`,JSON.stringify(value))
      state.district = value
  },
  updateAdcode(state,value){
      sessionStorage.setItem(`adcode`,JSON.stringify(value))
      state.adcode = value
  },
  updateProvince(state,value){
      sessionStorage.setItem(`province`,JSON.stringify(value))
      state.province = value
  },
  updateCity(state,value){
      sessionStorage.setItem(`city`,JSON.stringify(value))
      state.city = value
  },
  updateArea(state,value){
      sessionStorage.setItem(`area`,JSON.stringify(value))
      state.area = value
  },
  updateUserlevel(state,value){
      sessionStorage.setItem(`userLevel`,JSON.stringify(value))
      state.userLevel = value
  },
  updateUserinfo(state,value){
      sessionStorage.setItem(`userinfo`,JSON.stringify(value))
      state.userinfo = value
  },
  updateCurrentTime(state,value){
      sessionStorage.setItem(`currentTime`,JSON.stringify(value))
      state.currentTime = value
  },
  updateareaNum(state,value){
      sessionStorage.setItem(`areaNum`,JSON.stringify(value))
      state.areaNum = value
  },
  updateunitNum(state,value){
      sessionStorage.setItem(`unitNum`,JSON.stringify(value))
      state.unitNum = value
  },
  updateIPnum(state,value){
      sessionStorage.setItem(`IPnum`,JSON.stringify(value))
      state.IPnum = value
  },
  updatecountryMapData(state,value){
      sessionStorage.setItem(`countryMapData`,JSON.stringify(value))
      state.countryMapData = value
  },    
  updateprovinceMapData(state,value){
      sessionStorage.setItem(`provinceMapData`,JSON.stringify(value))
      state.provinceMapData = value
  },  
  updatecityMapData(state,value){
      sessionStorage.setItem(`cityMapData`,JSON.stringify(value))
      state.cityMapData = value
  },  
  updateareaMapData(state,value){
      sessionStorage.setItem(`areaMapData`,JSON.stringify(value))
      state.areaMapData = value
  },
  updateIPorUnit(state,value){
      sessionStorage.setItem(`IPorUnit`,JSON.stringify(value))
      state.IPorUnit = value
  }  
}
//准备state——用于存储数据
const state = {
  RSApubkey:'',
  isActive:''||JSON.parse(sessionStorage.getItem(`isActive`)),
  token:''||sessionStorage.getItem(`token`),
  // token:''||JSON.parse(localStorage.getItem(`token`)),
  IPorUnit:''||JSON.parse(sessionStorage.getItem(`IPorUnit`)),
  province:''||JSON.parse(sessionStorage.getItem(`province`)),
  district:''||sessionStorage.getItem(`district`),
  adcode:''||sessionStorage.getItem(`adcode`),
  city:''||JSON.parse(sessionStorage.getItem(`city`)),
  area:''||JSON.parse(sessionStorage.getItem(`area`)),
  userLevel:''||sessionStorage.getItem(`userLevel`),
  userinfo:sessionStorage.getItem(`userinfo`)||'',
  currentTime:''||JSON.parse(sessionStorage.getItem(`currentTime`)),
  areaNum:''||sessionStorage.getItem(`areaNum`),
  unitNum:''||sessionStorage.getItem(`unitNum`),
  IPnum:''||sessionStorage.getItem(`IPnum`),
  countryMapData:''||sessionStorage.getItem(`countryMapData`),
  provinceMapData:''||sessionStorage.getItem(`provinceMapData`),
  cityMapData:''||sessionStorage.getItem(`cityMapData`),
  areaMapData:''||sessionStorage.getItem(`areaMapData`),
  compareip:''||sessionStorage.getItem(`compareip`),
  comparearea:''||sessionStorage.getItem(`comparearea`),
}
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters,
  actions,
  mutations,
  state
})

export default store
