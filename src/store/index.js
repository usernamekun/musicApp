import { getLyric,getUserInfo,Login } from '@/until'
import { isShallow } from 'vue'
import { createStore } from 'vuex'

export default createStore({
  state: {
    playList:[{
      id: localStorage.getItem('id')? JSON.parse(localStorage.getItem('id')):'',
      al:{
        id: 72813719,
        name: "我用什么把你留住",
        pic: 109951167343222900,
        picUrl: localStorage.getItem('picUrl')?JSON.parse(localStorage.getItem('picUrl')):'',
        pic_str: "109951167343222893"
      },
      name:localStorage.getItem('name')? JSON.parse(localStorage.getItem('name')):''
    }],
    play:{
      id: localStorage.getItem('id')? JSON.parse(localStorage.getItem('id')):'',
      name:localStorage.getItem('name')? JSON.parse(localStorage.getItem('name')):'',
      picUrl:localStorage.getItem('picUrl')?JSON.parse(localStorage.getItem('picUrl')):''
    },
    playCurrentIndex:0,
    lyric:'',
    // 当前播放的时间
    currentTime:0,
    // 控制定时器
    intervaledId:0,
    // 是否正在播放
    isPlay:false,
    user:{
      isLogin:false,
      token:JSON.parse(localStorage.getItem('token'))||'',
    },
    userInfo:{
      level:0,
      profile:{}
    },
    // 歌词的下标
    isshow:true,
    keyword:''
  },
  getters: {
    getLyric(state){
      let arr = state.lyric.split(/\n/igs).map((item,i,arr)=>{
      let h = item.slice(1,3)
      let m = item.slice(4,6)
      let s = item.slice(7,10)
      // let lyric = item.slice(12,item.length)
      let lyric = item.split(']')[1]
        return {h,m,s,lyric,time:parseInt(h)*60*1000+parseInt(m)*1000+parseInt(s)}
      })
      arr.forEach((item,i,arr)=>{
        if(i+1 >= arr.length){
          item.pre = arr[i].time
        }else{
          item.pre = arr[i+1].time
        }
      })
      return arr
    }
  },
  mutations: {
    setKeyword(state,value){
      state.keyword = value
    },
    setShow(state,value){
      state.isshow = value
    },
    setIndex(state,value){
      state.index = value
    },
    setPlay(state,value){
      state.play = value
    },
    setIsPlay(state,value){
      state.isPlay = value
    },
    setPlayList(state,value){
      state.playList = value
    },
    setPlayIndex(state,value){
      state.playCurrentIndex = value
    },
    GETLYRIC(state,result){
      state.lyric = result
    },
    UPDATETIME(state,time){
      state.currentTime = time
    },
    GETUSERINFO(state,value){
      state.userInfo = value
    }
  },
  actions: {
    async getLyricList({commit},id){
      let result = await getLyric(id)
      commit('GETLYRIC',result.lrc?result.lrc.lyric:'')
    },
    async getToken({commit},{phone,password}){
      let result = await Login(phone,password)
      if(result.code==200){
        localStorage.setItem('token',JSON.stringify(result.token))
      }
      return result
    },
    async getUserInfo({commit},id){
      let result = await getUserInfo(id)
      console.log(result);
      if(result.code == 200){
        commit('GETUSERINFO',result)
      }
      }
  },
  modules: {
  }
})
