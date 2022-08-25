
// import { ref } from 'vue'

export default function useClose(target,closeW) {
  target.ontouchstart = () => {
    document.ontouchmove = (e) => {
      unWatch()
    }
    document.ontouchend = (e) => {
      setTimeout(() => {
        closeW()
      }, 500)
      document.ontouchmove = null
      document.ontouchend = null
    }
  }
}   