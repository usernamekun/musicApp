import store from '@/store'
// 自定义指令
// 移动端的拖拽
const drag = {
  // binding可以接受到使用这个指令的组件的方法
  mounted(el, binding) {
    el.ontouchstart = function(){
      let totalProgress = document.querySelector('.totalProgress')
      let currentProgress = document.querySelector('.currentProgress')
      console.log(binding);
      let totalTime = binding.value.totalTime
      document.ontouchmove = function(e){
        var ev = 'ontouchstart' in document ? e.touches[0] : e //这样就能同时在pc端和移动端使用了
        let X = ev.clientX
        let left = totalProgress&&totalProgress.offsetLeft
        let bili = (X-left)/totalProgress.offsetWidth
        if(bili>=0&&bili<=1){
          currentProgress.style.width = bili*100 + '%'
          let time = totalTime*bili
          store.commit('UPDATETIME',time)
          // 滑动期间暂停定时器
          clearInterval(store.state.intervaledId)
        }
      }
      document.ontouchend = function(e){
        var ev = 'ontouchstart' in document ? e.changedTouches[0] : e
        let X = ev.clientX
        let left = totalProgress&&totalProgress.offsetLeft
        let bili = (X-left)/totalProgress.offsetWidth
        let currentTime = totalTime*bili
        // 改变当前音乐的播放时间
        binding.value.changeTime(currentTime)
        document.ontouchmove = null
        document.ontouchend = null
      }
    }
  }
}


export default drag