import { defineStore } from 'pinia'
// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore('users', {
    // 其它配置项
    state:()=>{
        return {
            user:{},
            title:''
        }
    },
    actions:{
        /**
         * @description:修改导航栏标题
         * @param val 导航栏标题值
         */
        changeTitle(val) {
            this.title = val;
        }
    }
})
