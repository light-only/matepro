import axios from 'axios';
import router from "../router";

const myAxios = axios.create({
    //本地地址
    // baseURL: 'https://121.40.32.60:8082/api'
    //测试地址：
    baseURL: import.meta.env.VITE_APP_BASE_API
} as any);

const whiteList = ['/team/list/page','/user/recommend'];

myAxios.defaults.withCredentials = true;//允许携带cookie

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    if(response?.data?.code === 40100 ){
        router.push('/login');
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios
