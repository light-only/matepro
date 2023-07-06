import {UserType} from "../models/user";

let currentUser:UserType;

/**
 * 设置用户
 * @param user
 */
const setCurrentUserState = (user) =>{
    localStorage.setItem('userinfos',user)
}
/**
 * 获取用户
 */
const getCurrentUserState = () =>{
    let user = localStorage.getItem('userinfos');
    if(user){
        return JSON.parse(user);
    }else {
        return null;
    }
}

export {
    getCurrentUserState,
    setCurrentUserState,
}
