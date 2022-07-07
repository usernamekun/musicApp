// 对axios二次封装
import axios from "axios";

const request = axios.create({
  baseURL:'/api',
  timeout:5000
})
request.interceptors.request.use(config=>{
  return config
})
request.interceptors.response.use(response=>{
  return response.data
},error=>{
  console.log('fail',error.message);
})
export default request