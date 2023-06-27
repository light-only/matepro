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
export const getRecommendUser = ()=>{
    return myAxios.get('/user/recommend',{
        params:{
            pageSize:8,
            pageNum:1
        }
    })
}


