import {getCurrentUserState} from "../states/user";
import {getCurrentUser} from "../api";


/**
 * 获取用户信息，如果当前存在直接从本地获取，否则从接口获取
 */
export const getLoginUser = async () =>{
    const user = getCurrentUserState();
    if(user){
        return user;
    }
    //从接口获取用户信息
    const res = await getCurrentUser();
    if(res.code === 0){
        return res.data;
    }
    return null;
}
