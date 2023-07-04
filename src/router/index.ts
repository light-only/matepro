// 1. 定义路由组件.
// 也可以从其他文件导入
import Vue from 'vue';
import * as VueRouter from 'vue-router'
import Index from '../pages/Index.vue'
import Team from '../pages/Team.vue'
import User from '../pages/User.vue'
import Search from '../components/search/index.vue'
import Edit from '../pages/Edit.vue'
import UserResult from '../pages/UserResult.vue'
import UserLogin from '../pages/UserLogin.vue'
import TeamAddPage from '../pages/TeamAddPage.vue'
import TeamUpdatePage from '@/pages/TeamUpdatePage.vue'
import UserTeamCreate from '@/pages/UserTeamCreate.vue'
import UserTeamJoin from '@/pages/UserTeamJoin.vue'
import {useStore} from "../store";

import { useUsersStore } from "@/store/index.ts";
import {storeToRefs} from "pinia";

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
export const routes = [
    { path: '/index', component: Index,title:'首页' },
    { path: '/team', component: Team,title:'队伍' },
    {path:'/user',component: User,title: "个人中心"},
    {path:'/search',component: Search,title: "搜索队伍"},
    {path:'/edit',component: Edit,title: "修改信息"},
    {path:'/resultList',component: UserResult,title: "搜索结果"},
    {path:'/login',component: UserLogin,title: "登录"},
    {path:'/team/add',component:TeamAddPage,title: "添加队伍"},
    {path:'/team/update',component:TeamUpdatePage,title: "更新队伍"},
    {path:'/user/team/create',component: UserTeamCreate,title: "我创建的队伍"},
    {path:'/user/team/join',component: UserTeamJoin,title: "我加入的队伍"}
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
}as any);

router.beforeEach((to,from)=>{
    const store = useUsersStore();
    const toPath = to.path;
    const route = routes.find(it=>it.path == toPath);
    store.changeTitle(route?.title);

})
export default router;
// 现在，应用已经启动了！
