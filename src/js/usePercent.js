
// 点击进度条，获得百分比
export default function usePercent(ev){
    console.log(ev);
    let totalProgress = document.querySelector('.totalProgress')
    // 获得总进度条的宽度
    let totalWidth = totalProgress.offsetWidth
    // 获得鼠标点击位置
    let X = ev.pageX
    // 获得左侧的偏移量
    let left = totalProgress.offsetLeft
    // 获得百分比
    return (X-left)/totalWidth
  }
