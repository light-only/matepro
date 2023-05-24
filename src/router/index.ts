// 1. 定义路由组件.
// 也可以从其他文件导入
import Vue from 'vue';
import * as VueRouter from 'vue-router'
import Index from '../pages/Index.vue'
import Team from '../pages/Team.vue'
import User from '../pages/User.vue'
import Search from '../components/search/index.vue'
import Edit from '../pages/Edit.vue'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    { path: '/index', component: Index },
    { path: '/team', component: Team },
    {path:'/user',component: User},
    {path:'/search',component: Search},
    {path:'/edit',component: Edit}
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
}as any)

export default router;
// 现在，应用已经启动了！
