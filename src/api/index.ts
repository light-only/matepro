import myAxios from "../plugins/myAxios";
import qs from 'qs';

/**
 * 根据标签获取用户信息
 * @param data 标签数据
 */
export const getSearchUserByTags = (data)=>{
    return myAxios.get('/user/search/tags',{
        params:{
            tagNameList:data
        },
        //格式化数据处理
        paramsSerializer:{
            serialize:params => {
                return qs.stringify(params,{arrayFormat:'repeat'})
            }
        }
    });
}

/**
 * @description:用户注册
 * @param data
 */
export const userRegister = (data)=>{
    return myAxios.post('/user/register',data)
}

/**
 * 用户登录接口
 * @param data
 */
export const userLogin = (data)=>{
    return myAxios.post('/user/login', data);
}

/**
 * 获取当前登录用户信息
 */
export const getCurrentUser = () =>{
    return myAxios.get('/user/current');
}

/**
 * 更新用户信息
 * @param data
 */
export const updateUser = (data)=>{
    return myAxios.post('/user/update',data);
}

/**
 * 获取推荐的用户信息
 */
export const getRecommendUser = (params)=>{
    return myAxios.get('/user/recommend',{
        params
    })
}

/**
 * @description:获取心动模式下的用户
 * @param params
 */
export const getMayLikeUser = (params)=>{
    return myAxios.get('/user/matchUser',{
        params
    })
}

/**
 * @description:退出登录
 */
export const layoutUser = ()=>{
    return myAxios.post('/user/logout')
}
