import myAxios from "../plugins/myAxios";
import qs from 'qs';
export const getSearchUserByTags = (data)=>{
    return myAxios.get('/user/search/tags',{
        params:{
            tagNameList:data
        },
        paramsSerializer:{
            serialize:params => {
                return qs.stringify(params,{arrayFormat:'repeat'})
            }
        }
    });
}
