import request from './request'
// 获取轮播图图片的接口
export function getBanners(type){
  return request({url:`/banner?type=${type}`,method:'get'})
}
// 获取首页圆形图标的接口
export function getIconList(){
  return request({url:'/homepage/dragon/ball',method:'get'})
}

// 获取歌单接口
export function getSongList(limit){
  return request({url:`/personalized?limit=${limit}`})
}
// 获取歌单详情
export function getMusicDetail(id){
  return request({url:`/playlist/detail?id=${id}`,method:'get'})
}
// 获取歌词的接口
export function getLyric(id){
  return request({url:`/lyric?id=${id}`,method:'get'})
}
// 搜索关键字搜索建议
export function getKeyWord(keyword){
  return request({url:`/search/suggest?keywords=${keyword}&type=mobile`})
}
// 获取搜索的内容
export function getSearchContain(keyWorld){
  return request({url:`/cloudsearch?keywords=${keyWorld}`,method:'get'})
}
// 默认搜索关键字
export function getDefaultSearch(){
  return request({url:"/search/default"})
}
// 获取热搜列表
export function getSearchHot(){
  return request({url:'/search/hot/detail'})
}
// 登录的接口
export function Login(phone,password){
  return request({url:`/login/cellphone?phone=${phone}&password=${password}`,method:'get'})
}
// 获取用户详细信息
export const getUserInfo = (id)=> request({url:`/user/detail?uid=${id}`,method:'get'})
// 获取歌手列表
// export const getSongerList = (params)=> request({url:`/artist/list`,data:params})
export const getSongerList = ({type,area})=> request({url:`/artist/list?type=${type}&area=${area}`})