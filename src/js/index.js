// 保存到本地存储中
export function saveSong(id,name,picUrl){
  localStorage.setItem('id',JSON.stringify(id))
  localStorage.setItem('name',JSON.stringify(name))
  localStorage.setItem('picUrl',JSON.stringify(picUrl))
}
// 处理一下时间数据
export function formatTime(time){
  let formatTime
  let M = Math.floor(time/60)
  let S = Math.floor(time%60)
  time = Math.floor(time)
  if(time<10){
    formatTime = '00:0'+time
  }else if(time<60){
    formatTime = '00:'+time
  }else{
    if(M<10){
      M = '0'+M
    }
    if(S<10){
      S = '0'+S
    }
    formatTime = M + ':' + S
  }
  return formatTime
}
