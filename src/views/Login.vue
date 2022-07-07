<template>
  <div class="form_login">
    <div class="form_logo"><img src="@/assets/logo.png" /></div>
    <form id="form_login">
      <div class="form-group">
        <!-- <i class="fa fa-user"></i> -->
        <div class="iconfont">
          <svg class="icon fa" aria-hidden="true">
            <use xlink:href="#icon-yonghu"></use>
          </svg>
        </div>
        <input
          type="text"
          class="form-control"
          
          placeholder="Username"
          v-model="phone"
        />
      </div>

      <div class="form-group">
        <!-- <i class="fa fa-key"></i> -->
        <div class="iconfont">
          <svg class="icon fa" aria-hidden="true">
            <use xlink:href="#icon-mima"></use>
          </svg>
        </div>

        <input
          type="password"
          class="form-control"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div
        class="form-group"
        style="height: 25px; line-height: 25px; text-align: left"
      >
        <input
          type="checkbox"
          class=""
          name="checkbox"
          id="checkbox"
          placeholder="checkbox"
          autocomplete="off"
        />
        <span class="checkfont">记住我的帐号</span>
      </div>
      <!-- <div class="form-group">
        <button @click="login" class="btn">
          登录
        </button>
      </div> -->
    </form>
    <div class="form-group">
        <button @click="login" class="btn">
          登录
        </button>
      </div>
    <div class="form_footer">@2022/5/1坤坤网易云音乐</div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';
export default {
  name: "login",
  setup() {
    let state = reactive({
      phone:"",
      password:""
    })
    const store = useStore()
    const router = useRouter()
    async function login(){
      let result = await store.dispatch('getToken',{phone:state.phone,password:state.password})
      console.log(result);
      if(result.code == 200){
        setTimeout(()=>{
          router.push({name:'me',query:{id:result.account.id}})
          console.log(result.account.id);
          },10)
        // router.push({name:'me',query:{id:result.id}})
      }
    }
    return {
      ...toRefs(state),
      login
    }
  }
};
</script>

<style scoped>
.form_login {
  height: 100vh;
  background-color: rgb(251, 97, 42);
  max-width: 640px;
  margin: auto;
  text-align: center;
  padding-top: 100px;
}
.form_logo img{
  width: 1.9rem;
  height: 1.9rem;
}
.form-group {
  width: 355px;
  margin: 0 auto;
  height: 50px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.form-group .fa {
  width: 0.6rem;
  height: 0.6rem;
  float: left;
  fill: #fff;
}
.iconfont {
  margin-right: 0.1rem;
}
.form-group .form-control {
  display: block;
  width: 300px;
  height: 48px;
  float: left;
  border: 1px solid #ccc;
  padding: 0;
  margin-left: 0;
  text-indent: 1em;
  themecolor: #00a988;
}
.form-group .form-control:hover {
  border: 1px solid #0160a0;
}
.form-group .checkfont {
  color: #666;
}
.form-group .btn {
  width: 350px;
  height: 50px;
  background-color: #0160a0;
  border: 0px;
  color: #fff;
  font-size: 14px;
}
.form_footer {
  margin-top: 100px;
  font-size: 12px;
  color: #5b809a;
}
</style>
